<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marquee_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_active')->default(true);
            $table->text('text');
            $table->string('badge_text')->nullable()->default('LIMITED TIME');
            $table->string('link_url')->nullable()->default('/availability');
            $table->string('link_text')->nullable()->default('View Availability →');
            $table->string('font_size')->default('13px');
            $table->string('font_weight')->default('600');
            $table->string('text_color')->default('#ffffff');
            $table->string('bg_color')->default('#c77950');
            $table->string('bg_gradient_end')->nullable()->default('#994e2e');
            $table->integer('speed')->default(28);
            $table->boolean('pause_on_hover')->default(true);
            $table->string('direction')->default('left');
            $table->string('icon')->nullable()->default('sparkles');
            $table->timestamps();
        });

        // Insert default initial row
        DB::table('marquee_settings')->insert([
            'is_active' => true,
            'badge_text' => 'SPECIAL OFFER',
            'text' => '✨ Up to 8 Weeks Free on Select Residences + $1,000 Look & Lease Special · In-Person & Self-Guided Tours Available Daily!',
            'link_url' => '/availability',
            'link_text' => 'Check Availability →',
            'font_size' => '13px',
            'font_weight' => '600',
            'text_color' => '#ffffff',
            'bg_color' => '#c77950',
            'bg_gradient_end' => '#994e2e',
            'speed' => 28,
            'pause_on_hover' => true,
            'direction' => 'left',
            'icon' => 'sparkles',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marquee_settings');
    }
};
