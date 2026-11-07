<?php

namespace App\Http\Controllers;

use App\Models\MarqueeSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarqueeSettingController extends Controller
{
    /**
     * Display the marquee settings management page.
     */
    public function index()
    {
        $marquee = MarqueeSetting::first();

        if (!$marquee) {
            $marquee = MarqueeSetting::create([
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
                'smooth_mode' => true,
                'animation_style' => 'relaxed',
            ]);
        }

        return Inertia::render('Admin/Marquee/Index', [
            'marquee' => $marquee,
        ]);
    }

    /**
     * Update the marquee settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
            'text' => 'required|string|max:1000',
            'badge_text' => 'nullable|string|max:50',
            'link_url' => 'nullable|string|max:255',
            'link_text' => 'nullable|string|max:100',
            'font_size' => 'required|string|max:20',
            'font_weight' => 'required|string|max:20',
            'text_color' => 'required|string|max:30',
            'bg_color' => 'required|string|max:30',
            'bg_gradient_end' => 'nullable|string|max:30',
            'speed' => 'required|integer|min:5|max:180',
            'pause_on_hover' => 'required|boolean',
            'smooth_mode' => 'required|boolean',
            'animation_style' => 'required|string|in:relaxed,standard,gentle',
            'direction' => 'required|string|in:left,right',
            'icon' => 'nullable|string|max:50',
        ]);

        $marquee = MarqueeSetting::first();

        if (!$marquee) {
            $marquee = new MarqueeSetting();
        }

        $marquee->fill($validated);
        $marquee->save();

        return redirect()->back()->with('success', 'Marquee banner settings updated successfully!');
    }
}

