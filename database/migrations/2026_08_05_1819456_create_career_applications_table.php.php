<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('job_title')->nullable();
            $table->string('job_descriptions_id')->nullable();
            $table->string('email');
            $table->string('phone', 20)->nullable();
            $table->string('skill_level')->nullable();
            $table->text('address')->nullable();
            $table->string('resume')->nullable();
            $table->boolean('agree_terms')->default(false);
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'rejected'])->default('pending');
            $table->timestamps();
            
            $table->index(['status', 'skill_level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_applications');
    }
};