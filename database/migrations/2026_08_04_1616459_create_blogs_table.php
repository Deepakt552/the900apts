<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('excerpt', 500)->nullable();
            $table->string('author_name')->nullable();
            $table->longText('author_bio')->nullable();
            $table->string('summary', 500)->nullable();
            $table->longText('content');
            $table->longText('original_content')->nullable();
            $table->json('tags')->nullable();
            $table->text('keys')->nullable();
            $table->string('banner_image')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('read_time')->default('5 min');
            $table->enum('status', ['draft', 'published','schedule'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->longText('seo_keywords')->nullable();
            $table->dateTime('publish_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
