<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Job Application Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: #1a202c;
            padding: 10px 20px;
            border-bottom: 3px solid #3490dc;
            color: white;
        }

        .header h2 {
            margin: 0;
        }

        .content {
            padding: 20px;
        }

        .field {
            margin-bottom: 15px;
        }

        .label {
            font-weight: bold;
            color: #555;
        }

        .value {
            margin-top: 5px;
        }

        .highlight {
            background: #f0f9ff;
            padding: 15px;
            border-left: 4px solid #3490dc;
            margin: 10px 0;
        }

        .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #777;
        }

        .badge {
            display: inline-block;
            background: #3490dc;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>New Job Application Received</h2>
        </div>

        <div class="content">
            <div class="highlight">
                <strong>Applicant:</strong> {{ $send_data['full_name'] ?? 'N/A' }}
                <br>
                <!-- <strong>Application ID:</strong> #{{ $send_data['application_id'] ?? 'N/A' }} -->
            </div>

            <div class="field">
                <div class="label">Job Title:</div>
                <div class="value"><span class="badge">{{ $send_data['job_title'] ?? 'N/A' }}</span></div>
            </div>
            <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">{{ $send_data['full_name'] ?? 'N/A' }}</div>
            </div>

            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{ $send_data['email'] ?? 'N/A' }}</div>
            </div>

            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">{{ $send_data['phone'] ?? 'N/A' }}</div>
            </div>

            <div class="field">
                <div class="label">Skill Level:</div>
                <div class="value"><span class="badge">{{ $send_data['skill_level'] ?? 'N/A' }}</span></div>
            </div>

            <div class="field">
                <div class="label">Address:</div>
                <div class="value">{{ $send_data['address'] ?? 'N/A' }}</div>
            </div>

            @if(isset($send_data['applied_at']))
                <div class="field">
                    <div class="label">Date Applied:</div>
                    <div class="value">{{ $send_data['applied_at'] }}</div>
                </div>
            @endif

            <div class="field" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee;">
                <div style="font-size: 14px; color: #2d3748;">
                    <strong>📎 Resume Attached</strong>
                    <br>
                    <span style="font-size: 12px; color: #718096;">The applicant's resume is attached to this
                        email.</span>
                </div>
            </div>

            <div class="field" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee;">
                <div style="font-size: 12px; color: #777;">
                    <strong>Application Type:</strong> Career Application
                    <br>
                    <strong>Link ID:</strong> {{ $link_id ?? 'N/A' }}
                </div>
            </div>
        </div>

        <div class="footer">
            <p>This email was sent from your website career application form.</p>
            <p>Please review the attached resume and contact the applicant if you wish to proceed.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>