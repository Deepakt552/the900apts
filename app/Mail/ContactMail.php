<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    protected $attachmentPath;
    protected $attachmentName;

    /** 
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
        $this->attachmentPath = $data['attachment_path'] ?? null;
        $this->attachmentName = $data['attachment_name'] ?? null;
    }

    /**
     * Build the message.
     */
    public function build() 
    {
        $linkWith = $this->data['link_with'] ?? 2;

        // Select the appropriate view based on link_with
        if ($linkWith == 0) {
            // Contact Form
            $email = $this->view('emails.ContactMail')
                ->subject($this->data['Subject']??'Contact Form Inquiry')
                ->with([
                    'link_with' => $linkWith,
                    'link_id' => $this->data['link_id'] ?? 0,
                    'send_data' => $this->data['send_data'] ?? [],
                ]);
        } elseif ($linkWith == 1) {
            // Job Application
            $email = $this->view('emails.JobMail')
                ->subject($this->data['Subject'])
                ->with([
                    'link_with' => $linkWith,
                    'job_title' => $this->data['job_title'] ?? "Not Get Title",
                    'link_id' => $this->data['link_id'] ?? 0,
                    'send_data' => $this->data['send_data'] ?? [],
                ]);

            // Attach resume only for job applications
            if ($this->attachmentPath && Storage::disk('public')->exists($this->attachmentPath)) {
                $email->attach(Storage::disk('public')->path($this->attachmentPath), [
                    'as' => $this->attachmentName ?? 'resume',
                    'mime' => $this->getMimeType($this->attachmentPath),
                ]);
            }
        } elseif ($linkWith == 2) {
            // Job Application
            $email = $this->view('emails.shortlisted')
                ->subject($this->data['Subject'])
                ->with([
                    'link_with' => $linkWith,
                    'job_title' => $this->data['job_title'] ?? "Not Get Title",
                    'link_id' => $this->data['link_id'] ?? 0,
                    'send_data' => $this->data['send_data'] ?? [],
                ]);

            // Attach resume only for job applications
            if ($this->attachmentPath && Storage::disk('public')->exists($this->attachmentPath)) {
                $email->attach(Storage::disk('public')->path($this->attachmentPath), [
                    'as' => $this->attachmentName ?? 'resume',
                    'mime' => $this->getMimeType($this->attachmentPath),
                ]);
            }
        } else {
            // Default/fallback
            $email = $this->view('emails.ContactMail')
                ->subject('Inquiry')
                ->with([
                    'link_with' => $linkWith,
                    'link_id' => $this->data['link_id'] ?? 0,
                    'send_data' => $this->data['send_data'] ?? [],
                ]);
        }

        return $email;
    }

    /**
     * Get the MIME type for the attachment
     */
    private function getMimeType($path): string
    {
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        return match (strtolower($extension)) {
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            default => 'application/octet-stream',
        };
    }
}