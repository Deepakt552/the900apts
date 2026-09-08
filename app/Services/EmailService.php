<?php
namespace App\Services;

use App\Mail\ContactMail;
use App\Models\MailLog;
use App\Models\Setting;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EmailService
{
    /**
     * Send email using ContactMail Mailable
     *
     * @param array $data
     * @return array
     */
    public function sendEmail(array $data): array
    {
        try {
            Log::info('Starting email sending', [
                'link_with' => $data['link_with'] ?? null,
                'email_id' => $data['email_id'] ?? null
            ]);

            // Check if email sending is enabled
            $settings = Setting::where('send_mail', 1)->first();

            if (!$settings) {
                Log::info('Email sending is disabled in settings');

                $this->logEmail(
                    $data['link_id'] ?? null,
                    $data['link_with'] ?? 2,
                    0,
                    $data['attachment_path'] ?? null,
                    "Email sending is disabled in settings",
                );

                return [
                    'status' => false,
                    'message' => 'Email sending is disabled'
                ];
            }
            if ($data['link_with'] == 2) {
                $settings = Setting::where('Shortlisted', 1)->first();

                if (!$settings) {
                    Log::info('Email Shortlisted sending is disabled in settings');

                    $this->logEmail(
                        $data['link_id'] ?? null,
                        $data['link_with'] ?? 2,
                        0,
                        $data['attachment_path'] ?? null,
                        "Email Shortlisted is disabled in settings",
                    );

                    return [
                        'status' => false,
                        'message' => 'Email sending is disabled'
                    ];
                }
            }

            // Primary recipient
            $primaryEmail = env('PRIMARY_EMAIL', 'itdev1@navkarservices.com');
            $primaryEmailID = env('PRIMARY_EMAIL', 'itdev1@navkarservices.com');

            // Get CC recipients from settings
            $ccEmails = $this->getCcRecipients();

            // Prepare email data for ContactMail
            $emailData = [
                'link_with' => $data['link_with'] ?? 2,
                'link_id' => $data['link_id'] ?? 0,
                'send_data' => $data['send_data'] ?? [],
                'attachment_path' => $data['attachment_path'] ?? null,
                'attachment_name' => $data['attachment_name'] ?? null, 
                'job_title' => $data['job_title'] ?? null,
                'Subject'=>$data['Subject'] ?? 'Please Send Subject', 
            ];

            // Send email to primary recipient
            $primaryMail = new ContactMail($emailData);
            Mail::to($primaryEmailID)->send($primaryMail);

            Log::info('Primary email sent successfully', [
                'link_with' => $data['link_with'] ?? null,
                'primary_email' => $primaryEmail
            ]);

            // Log primary email success
            $this->logEmail(
                $data['link_id'] ?? null,
                $data['link_with'] ?? 2,
                1,
                $data['attachment_path'] ?? null,
                $data['Subject']
            );

            // Send separate emails to CC recipients
            $ccSuccessCount = 0;
            $ccFailCount = 0;
            $ccErrors = [];

            foreach ($ccEmails as $ccEmail) {
                try {
                    $ccMail = new ContactMail($emailData);
                    Mail::to($ccEmail)->send($ccMail);

                    $ccSuccessCount++;

                    Log::info('CC email sent successfully', [
                        'link_with' => $data['link_with'] ?? null,
                        'cc_email' => $ccEmail
                    ]);

                    $this->logEmail(
                        $data['link_id'] ?? null,
                        $data['link_with'] ?? 2,
                        1,
                        $data['attachment_path'] ?? null,
                        null
                    );

                } catch (Exception $e) {
                    $ccFailCount++;
                    $ccErrors[] = [
                        'email' => $ccEmail,
                        'error' => $e->getMessage()
                    ];

                    Log::error('Failed to send CC email', [
                        'link_with' => $data['link_with'] ?? null,
                        'cc_email' => $ccEmail,
                        'error' => $e->getMessage()
                    ]);

                    $this->logEmail(
                        $data['link_id'] ?? null,
                        $data['link_with'] ?? 2,
                        0,
                        $data['attachment_path'] ?? null,
                        'CC email failed: ' . $ccEmail . ' - ' . $e->getMessage()
                    );
                }
            }

            Log::info('All emails sent summary', [
                'link_with' => $data['link_with'] ?? null,
                'primary_email' => $primaryEmail,
                'cc_success' => $ccSuccessCount,
                'cc_fail' => $ccFailCount,
                'total_cc_recipients' => count($ccEmails)
            ]);

            return [
                'status' => true,
                'message' => 'Emails sent successfully',
                'details' => [
                    'primary' => $primaryEmail,
                    'cc_success' => $ccSuccessCount,
                    'cc_fail' => $ccFailCount,
                    'cc_errors' => $ccErrors
                ]
            ];

        } catch (Exception $e) {
            Log::error('Failed to send email', [
                'link_with' => $data['link_with'] ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            $this->logEmail(
                $data['link_id'] ?? null,
                $data['link_with'] ?? 2,
                0,
                $data['attachment_path'] ?? null,
                $e->getMessage(),
            );

            return [
                'status' => false,
                'message' => 'Failed to send email: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Get CC recipients from settings
     *
     * @return array
     */
    private function getCcRecipients(): array
    {
        try {
            $settings = Setting::where('send_mail', 1)->first();

            if (!$settings || empty($settings->send_user_emails)) {
                Log::info('No CC recipients found in settings');
                return [];
            }

            $emails = $settings->send_user_emails;

            $validEmails = array_filter($emails, function ($email) {
                return filter_var(
                    trim($email),
                    FILTER_VALIDATE_EMAIL
                );
            });

            Log::info('CC recipients retrieved from settings', [
                'count' => count($validEmails),
                'emails' => $validEmails
            ]);

            return array_values($validEmails);

        } catch (\Exception $e) {
            Log::error('Error fetching CC recipients', [
                'error' => $e->getMessage()
            ]);

            return [];
        }
    }

    /**
     * Log email in mail_logs table
     *
     * @param string $mail_id
     * @param int $link_with
     * @param int $status
     * @param string|null $errorMessage
     * @return void
     */
    private function logEmail(string $link_id, int $link_with, int $status, ?string $document = null, ?string $errorMessage = null): void
    {
        try {
            MailLog::create([
                'table_id' => $link_id,
                'link_with' => $link_with,
                'status' => $status,
                'sent_at' => now(),
                'document' => $document,
                'error_message' => $errorMessage
            ]);

            Log::info('Email logged in mail_logs', [
                'table_id' => $link_id,
                'link_with' => $link_with,
                'status' => $status
            ]);

        } catch (Exception $e) {
            Log::error('Failed to log email in mail_logs', [
                'error' => $e->getMessage(),
                'table_id' => $link_id,
            ]);
        }
    }
}


//old
// namespace App\Services;

// use App\Mail\ContactMail;
// use App\Models\MailLog;
// use App\Models\Setting;
// use Exception;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Facades\Storage;

// class EmailService
// {
//     /**
//      * Send resident signup email with PDF attachment
//      *
//      * @param array $data
//      * @return array
//      */
//     public function sendResidentSignupEmail(array $data): array
//     {
//         try {
//             Log::info('Starting resident signup email sending', [
//                 'link_with' => $data['link_with'] ?? null,
//                 'data'=>$data['send_data']
//             ]);

//             // Check if email sending is enabled
//             $settings = Setting::where('send_mail', 1)->first();


//             if (!$settings) {
//                 Log::info('Email sending is off');

//                 // Log that email is disabled
//                 $this->logEmail(
//                     $data['email_id'],
//                     3,
//                     0,
//                     "Not send. Setting is disable"
//                 );

//                 return [
//                     'status' => true,
//                     'message' => 'Email sending is off'
//                 ];
//             }

//             // Primary recipient
//             // $primaryEmail = 'itdev1@navkarservices.com';
//             $primaryEmail = env('PRIMARY_EMAIL', 'itdev1@navkarservices.com');

//             // Get CC recipients from settings
//             $ccEmails = $this->getCcRecipients();

//             // Prepare email data
//             $emailData = [
//                 'link_with' => $data['link_with'] ?? 2,
//                 'link_id' => $data['link_id'] ?? 0,
//                 'send_data'=>$data['send_data']
//             ];

//             // Send email to primary recipient
//             $primaryMail = new ContactMail($emailData);

//             //  CORRECT WAY - using to() and send()
//             Mail::to($primaryEmail)->send($primaryMail);

//             Log::info('Primary email sent successfully', [
//                 'link_with' => $data['link_with'] ?? null,
//                 'primary_email' => $primaryEmail
//             ]);

//             // Log primary email success
//             $this->logEmail(
//                 $data['email_id'],
//                 $data['link_with'],
//                 1,
//                 'mail sent (primary)',
//             );

//             // Send separate emails to CC recipients
//             $ccSuccessCount = 0;
//             $ccFailCount = 0;
//             $ccErrors = [];

//             foreach ($ccEmails as $ccEmail) {
//                 try {
//                     // Create a new instance for each CC recipient
//                     $ccMail = new ContactMail($emailData);

//                     //  CORRECT WAY - using to() and send()
//                     Mail::to($ccEmail)->send($ccMail);

//                     $ccSuccessCount++;

//                     Log::info('CC email sent successfully', [
//                         'link_with' => $data['link_with'] ?? null,
//                         'cc_email' => $ccEmail
//                     ]);

//                     // Log each CC email success
//                     $this->logEmail(
//                         $data['email_id'],
//                         $data['link_with'],
//                         1,
//                         "sent mail " . $ccEmail
//                     );

//                 } catch (Exception $e) {
//                     $ccFailCount++;
//                     $ccErrors[] = [
//                         'email' => $ccEmail,
//                         'error' => $e->getMessage()
//                     ];

//                     Log::error('Failed to send CC email', [
//                         'link_with' => $data['link_with'] ?? null,
//                         'cc_email' => $ccEmail,
//                         'error' => $e->getMessage()
//                     ]);

//                     // Log CC email failure
//                     $this->logEmail(
//                         'mail sent failed (cc) ' . $ccEmail,
//                         $data['link_with'],
//                         0,
//                         $e->getMessage()
//                     );
//                 }
//             }

//             Log::info('All emails sent summary', [
//                 'link_with' => $data['link_with'] ?? null,
//                 'primary_email' => $primaryEmail,
//                 'cc_success' => $ccSuccessCount,
//                 'cc_fail' => $ccFailCount,
//                 'total_cc_recipients' => count($ccEmails)
//             ]);

//             return [
//                 'status' => true,
//                 'message' => 'Emails sent successfully',
//                 'details' => [
//                     'primary' => $primaryEmail,
//                     'cc_success' => $ccSuccessCount,
//                     'cc_fail' => $ccFailCount,
//                     'cc_errors' => $ccErrors
//                 ]
//             ];

//         } catch (Exception $e) {
//             Log::error('Failed to send resident signup email', [
//                 'link_with' => $data['link_with'] ?? null,
//                 'error' => $e->getMessage(),
//                 'trace' => $e->getTraceAsString()
//             ]);

//             $this->logEmail(
//                 'mail sent failed',
//                 $data['link_with'],
//                 0,
//                 $e->getMessage()
//             );

//             return [
//                 'status' => false,
//                 'message' => 'Failed to send email: ' . $e->getMessage()
//             ];
//         }
//     }

//     /**
//      * Get CC recipients from settings
//      *
//      * @return array
//      */
//     private function getCcRecipients(): array
//     {
//         try {
//             $settings = Setting::where('send_mail', 1)->first();

//             if (!$settings || empty($settings->send_user_emails)) {
//                 Log::info('No CC recipients found in settings');
//                 return [];
//             }

//             // Already array because of cast
//             $emails = $settings->send_user_emails;

//             $validEmails = array_filter($emails, function ($email) {
//                 return filter_var(
//                     trim($email),
//                     FILTER_VALIDATE_EMAIL
//                 );
//             });

//             Log::info('CC recipients retrieved from settings', [
//                 'count' => count($validEmails),
//                 'emails' => $validEmails
//             ]);

//             return array_values($validEmails);

//         } catch (\Exception $e) {
//             Log::error('Error fetching CC recipients', [
//                 'error' => $e->getMessage()
//             ]);

//             return [];
//         }
//     }

//     /**
//      * Log email in mail_logs table
//      *
//      * @param string $mail_id
//      * @param int $link_with
//      * @param int $status
//      * @param string|null $errorMessage
//      * @return void
//      */
//     private function logEmail(string $mail_id, int $link_with, int $status, ?string $errorMessage = null): void
//     {
//         try {
//             MailLog::create([
//                 'mail_id' => $mail_id,
//                 'link_with' => $link_with,
//                 'status' => $status,
//                 'sent_at' => now(),
//                 'error_message' => $errorMessage,
//             ]);

//             Log::info('Email logged in mail_logs', [
//                 'mail_id' => $mail_id,
//                 'link_with' => $link_with,
//                 'status' => $status
//             ]);

//         } catch (Exception $e) {
//             Log::error('Failed to log email in mail_logs', [
//                 'error' => $e->getMessage(),
//                 'mail_id' => $mail_id,
//             ]);
//         }
//     }
// }