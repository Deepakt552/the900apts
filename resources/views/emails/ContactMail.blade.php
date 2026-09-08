<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact Form Inquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f4f4f4; padding: 10px 20px; border-bottom: 3px solid #3490dc; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Inquiry</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{{ $send_data['name'] ?? 'N/A' }}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{ $send_data['email'] ?? 'N/A' }}</div>
            </div>
            
            @if(isset($send_data['phone']) && $send_data['phone'])
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">{{ $send_data['phone'] }}</div>
            </div>
            @endif
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{{ $send_data['message'] ?? 'N/A' }}</div>
            </div>

            <div class="field" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee;">
                <div style="font-size: 12px; color: #777;">
                    <strong>Inquiry Type:</strong> Contact Form
                    <br>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from your website contact form.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>