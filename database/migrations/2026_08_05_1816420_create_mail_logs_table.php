<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mail_logs', function (Blueprint $table) {
            $table->id();
            $table->string('table_id')->nullable()->comment('contact_inquiries,	career_applications,Shortlisted_id');
            $table->string('document')->nullable()->comment('null means doesnt document');
            $table->tinyInteger('link_with')
                ->default(6)
                ->comment('0 = contact form, 1 = Job Inquiry,2 shortlisted ,6 means random');

            $table->tinyInteger('status')
                ->default(1)
                ->comment('0 = Failed, 1 = Success');

            $table->timestamp('sent_at')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mail_logs');
    }
};
