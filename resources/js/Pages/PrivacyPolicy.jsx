import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Shield,
    FileText,
    MailQuestion,
    Send,
    User,
    Building,
    LayoutGrid,
    MapPinned,
    Users,
    CreditCard,
    Video,
    Sparkles,
    Phone,
    Mail,
    Clock,
    Home,
    Dumbbell,
    Image,
    MapPin,
    Info,
    Award,
    FileCheck,
    ScrollText,
    Accessibility,
    CheckCircle,
    MessageSquare,
    CalendarDays,
    Briefcase,
    GraduationCap,
    DollarSign,
    AlertCircle,
    Heart,
    Star,
    ChevronRight,
    ExternalLink,
    X,
    Menu,
    ArrowLeft,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "./config";
import ContactForm from "./ContactForm";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";

function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy · The 900 Residences Koreatown LA</title>
                <meta
                    name="description"
                    content="The 900 Vermont, LLC Privacy Policy: Learn how we collect, safeguard, and process your personal data offline and online."
                />
            </Head>
            <Navbar />

            <div className="relative bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c] overflow-hidden">
                {/* Subtle Architectural Pattern */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="privacy-changsal-pattern"
                            width="80"
                            height="80"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect
                                x="10"
                                y="10"
                                width="60"
                                height="60"
                                fill="none"
                                stroke="#1a1f2c"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M 40 10 L 40 70 M 10 40 L 70 40"
                                fill="none"
                                stroke="#c77950"
                                strokeWidth="0.8"
                                strokeDasharray="4 4"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#privacy-changsal-pattern)" />
                </svg>

                {/* ================= HERO BANNER ================= */}
                <section className="relative min-h-[440px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pb-20 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/Header/Genral%20info.webp)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
                    </div>

                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#c77950]/20 rounded-full blur-[110px]" />

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#c77950]/60 shadow-lg mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#c77950] animate-pulse" />
                                <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#ffd9c7]">
                                    THE 900 • PRIVACY & COMPLIANCE
                                </span>
                            </div>

                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                                Privacy Policy
                            </h1>

                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                How 900 Vermont, LLC collects, utilizes, and safeguards your personal data offline and online.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90">
                                <Shield className="w-3.5 h-3.5 text-[#ffd9c7]" />
                                <span>Last Updated: August 10, 2021</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= MAIN CONTENT ================= */}
                <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="rounded-3xl bg-white/95 border border-[#d6d8e5] p-6 sm:p-10 md:p-12 shadow-sm space-y-10">

                    {/* INTRO */}
                    <section className="space-y-6 text-sm leading-7 text-[#464c60] sm:text-base">
                        <p>
                            <strong className="text-[#1a1f2c]">
                                This Privacy Policy describes how 900 Vermont,
                                LLC collects, uses, and discloses your personal
                                information both offline, and on the websites,
                                apps, and services where this Privacy Policy
                                appears or is referenced. This Privacy Policy
                                applies to information 900 Vermont, LLC collects
                                through: (1) the 900 Vermont, LLC website; (2)
                                other websites and online services that 900
                                Vermont, LLC owns, operates, or makes available
                                and that link to the Privacy Policy and (3) to
                                all other general enquiries 900 Vermont, LLC
                                receives (including postal mail, electronic
                                mail, telephone requests and in person). This
                                Privacy Policy does not apply to personal
                                information 900 Vermont, LLC collects from its
                                employees and contractors.
                            </strong>
                        </p>

                        <p>
                            <strong className="text-[#1a1f2c]">
                                By accessing 900 Vermont, LLC's website on which
                                the Privacy Policy is available, you confirm
                                that you have read, understand, and acknowledge
                                the terms of this Privacy Policy. This Privacy
                                Policy is not a contract and does not create any
                                legal rights or obligations.
                            </strong>
                        </p>
                    </section>

                    {/* 12 POINTS */}
                    <section className="mt-12">
                        <div className="mb-7 flex items-center gap-3 border-b pb-4 border-[#d6d8e5]">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                <FileText className="h-5 w-5" />
                            </span>
                            <h2 className="text-lg font-semibold text-[#1a1f2c]">
                                This Privacy Policy includes the following
                                sections. You should read the entire Privacy
                                Policy;
                            </h2>
                        </div>

                        <div className="space-y-5 text-sm leading-6 text-[#464c60]">
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    1
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We collect and use personal information
                                        from and about you.
                                    </strong>{" "}
                                    The information we collect depends on how
                                    you interact with us.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    2
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We use personal information as described
                                        here.
                                    </strong>{" "}
                                    You do not have to provide Personal
                                    Information to use this Site. However, your
                                    use of particular services made through the
                                    Site may require 900 Vermont, LLC to
                                    collect, use and store Personal Information
                                    from you. We may also use personal
                                    information for marketing, to respond to
                                    your requests, to improve our products and
                                    services, to comply with our obligations, to
                                    administer our websites and services, for
                                    internal operations and security purposes,
                                    and as otherwise disclosed or permitted by
                                    law.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    3
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We collect personal information about
                                        you from various sources.
                                    </strong>{" "}
                                    These sources include collecting information
                                    directly from you and your device, from our
                                    vendors and other sources, and by combining
                                    information.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    4
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We share your personal information with
                                        other parties.
                                    </strong>{" "}
                                    We may share personal information with
                                    parties including, the 900 Vermont, LLC
                                    family of companies and business units,
                                    service providers and vendors who perform
                                    services on our behalf, our business
                                    partners and marketing companies, to comply
                                    with the law or to protect ourselves, our
                                    customers and others, or as part of a
                                    transaction.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    5
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        You have certain choices about how we
                                        use your personal information.
                                    </strong>{" "}
                                    You can opt-out of some of our uses of
                                    personal information. This includes certain
                                    of our online tracking and advertising
                                    tools, and our promotional email.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    6
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        Your California Privacy Rights.
                                    </strong>{" "}
                                    Residents of California have additional
                                    choices under California law. You can learn
                                    about these in this section.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    7
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We may process and store information in
                                        the United States.
                                    </strong>{" "}
                                    Information processed and stored in the
                                    United States and may be accessed by United
                                    States enforcement according to United
                                    States law.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    8
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        Our websites and services are not
                                        directed to nor intended for children.
                                    </strong>
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    9
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We use standard security measures.
                                    </strong>{" "}
                                    However, the internet is not 100% secure,
                                    and we cannot promise that your information
                                    will be completely safe.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    10
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We may link to third party sites or
                                        services we don't control.
                                    </strong>{" "}
                                    We are not responsible for these sites or
                                    services.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    11
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        Feel free to contact us at{" "}
                                        <a href="mailto:info@the900apts.com" className="text-[#c77950] font-semibold hover:underline">info@the900apts.com</a>
                                        .
                                    </strong>
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c77950] font-bold text-white text-xs">
                                    12
                                </span>
                                <p>
                                    <strong className="text-[#1a1f2c]">
                                        We may update this Privacy Policy.
                                    </strong>{" "}
                                    Any changes made to this Privacy Policy will
                                    become effective upon posting.
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="mb-10 mt-10">
                        <ContactForm />
                    </div>
                    {/* DETAILED PRIVACY POLICY */}
                    <section className="space-y-12 text-sm leading-7 text-[#464c60] sm:text-base">
                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We collect and use personal information from and
                                about you.
                            </h2>
                            <p className="mb-5">
                                900 Vermont, LLC (and the vendors we hire to
                                perform services on our behalf) collect,
                                receive, and develop several categories of
                                personal information about you depending on the
                                nature of your interactions with us. For
                                example:
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Contact Information.
                                        </h3>
                                        <p>
                                            For example, we might collect your
                                            name, email address, account
                                            username and password, social media
                                            account handles, phone number, and
                                            mailing address. If you contact 900
                                            Vermont, LLC by email through the
                                            Site, 900 Vermont, LLC may keep a
                                            record of your contact information
                                            and correspondence, and reserve the
                                            right to use your email address, and
                                            any information you provide in your
                                            message, to respond thereto.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <Building className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Commercial and Preference
                                            Information.
                                        </h3>
                                        <p>
                                            We may collect information about
                                            your purchase history, retailer
                                            preferences, leasing details,
                                            apartment rental history, and your
                                            other transactions and preferences.
                                            We may also collect your comments
                                            that you post on our websites or
                                            blogs and your responses to surveys
                                            you complete. In certain
                                            circumstances such as in the case of
                                            an residential or commercial lease,
                                            we may collect or ask you to provide
                                            additional personal information such
                                            as government issued identification,
                                            financial information and employment
                                            information. At parking garages at
                                            certain of our properties, we may
                                            use license plate reader technology
                                            to collect license plate and
                                            vehicle-related information
                                            including video of the vehicle, a
                                            photograph of the license plate
                                            (which may include parts of the
                                            vehicle surrounding the license
                                            plate), the GPS location of the
                                            vehicle, and the time and date of
                                            the read.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <LayoutGrid className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Internet and Network
                                            Activity Information.
                                        </h3>
                                        <p>
                                            If you use our websites or apps, we
                                            may collect information about the
                                            browser you are using and your IP
                                            address. We might also collect
                                            device identifiers and information
                                            about how you use our Wi-Fi network
                                            and other services. We might collect
                                            information at the site you came
                                            from, or the site you visit when you
                                            leave us. We may collect page
                                            interaction information (such as
                                            what areas of the websites you visit
                                            and for how long, what search terms
                                            you enter, and what products or
                                            content you view and click on), and
                                            methods used to browse away from the
                                            page.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <MapPinned className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Location Information.
                                        </h3>
                                        <p>
                                            We may collect your precise GPS
                                            location when you access our apps or
                                            the mobile version of our websites.
                                            We also collect information about
                                            your general location, using your
                                            zip code or postcode and IP address.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Demographic Information.
                                        </h3>
                                        <p>
                                            We may collect information like your
                                            ethnicity, gender, birth date, age,
                                            language spoken, housing status,
                                            current household size, current
                                            household type, annual household
                                            income, desired housing
                                            characteristics and desired housing
                                            location or community.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Payment Information.
                                        </h3>
                                        <p>
                                            We collect your credit card and
                                            other payment details if you make a
                                            purchase or sign up through some of
                                            our services.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect Audio/Visual Information.
                                        </h3>
                                        <p>
                                            When you visit certain properties,
                                            we may record audio and video at the
                                            property.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c77950] text-[#c77950]">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-[#1a1f2c]">
                                            We collect and develop Inferences.
                                        </h3>
                                        <p>
                                            Using the other pieces of personal
                                            information collected about you, we
                                            may draw inferences about you,
                                            reflecting what we believe to be
                                            your preferences, characteristics,
                                            predispositions, and attitudes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We use personal information as described here.
                            </h2>
                            <p className="mb-4">
                                We use the above-referenced categories of
                                personal information for the following purposes:
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information to provide you with
                                    services and fulfill your transactions.
                                </strong>
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information for marketing purposes.
                                </strong>{" "}
                                For example, we might use personal information
                                to provide you with information about special
                                promotions, retailer discounts, purchase
                                incentives, prize promotions, shopping guides,
                                or offers. We might also use this information to
                                serve you ads about our products and offers. We
                                might tell you about new features or services.
                                You may opt-in to receive our email newsletters
                                or to receive text messages from us. To learn
                                about your choices for these communications,
                                read the Choices section below.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information to respond to your
                                    requests or questions.
                                </strong>{" "}
                                We use information to contact you in response to
                                your feedback or other matters related to our
                                relationship with you (such as about this
                                Privacy Policy or our Terms of Use). If your
                                inquiries or feedback relate to your leases,
                                purchases, or an account, we may also use your
                                information to address the matter.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information to analyze and improve
                                    our products and services.
                                </strong>{" "}
                                For example, may use your information to make
                                our websites, services, and products better. We
                                might use your information to customize your
                                experience with us and to conduct research and
                                analysis.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information to comply with our
                                    obligations, administer our websites and
                                    services, and for internal operations.
                                </strong>{" "}
                                For example, we use personal information to
                                administer the websites, such as
                                troubleshooting, data analysis, and testing.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information for security purposes.
                                </strong>{" "}
                                For example, we may use personal information to
                                protect our company, our customers, and our
                                business partners. We also may use personal
                                information to protect our websites or our
                                services, as well as to detect and investigate
                                activities that may be illegal or prohibited
                                (such as cyber attacks or fraudulent
                                transactions).
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We use information for verification
                                    purposes.
                                </strong>{" "}
                                For example, we will use certain pieces of
                                personal information to verify your identity if
                                you make requests pursuant to this Privacy
                                Policy. The verification steps and the pieces of
                                personal information that we request may vary
                                depending on the sensitivity and nature of your
                                request.
                            </p>
                            <p>
                                <strong className="text-[#1a1f2c]">
                                    We use information as otherwise disclosed or
                                    permitted by law, or as we may notify you.
                                </strong>{" "}
                                We may use personal information to create
                                deidentified or aggregated data which does not
                                identify you or any other individual. We may use
                                and disclose this anonymous or aggregated data
                                as we choose.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We collect personal information about you from
                                various sources.
                            </h2>
                            <p className="mb-4">
                                We collect personal information about you from
                                various sources, directly and indirectly,
                                including from the following sources:
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We collect personal information directly
                                    from you.
                                </strong>{" "}
                                For example, we collect information if you sign
                                up for an account, enter into an agreement,
                                participate in a promotion, contact us, sign up
                                for our text and other messages, or sign up for
                                investor alerts or other emails. We also collect
                                Payment and Commercial and Preference
                                Information if you make a purchase. We also
                                collect any personal information you provide if
                                you post a comment, make a request, or complete
                                a survey.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We collect personal information from your
                                    devices.
                                </strong>{" "}
                                We use tracking tools like browser cookies and
                                web beacons to automatically collect information
                                about you. We collect information when you
                                interact with our websites, our ads, or our
                                emails that we or our vendors send to you. To
                                learn about your choices for these tracking
                                tools, read the Choices section below. We may
                                also collect information for your devices
                                passively using WiFi technology.
                            </p>
                            <p className="mb-4">
                                <strong className="text-[#1a1f2c]">
                                    We receive personal information from vendors
                                    we hire to work on our behalf.
                                </strong>{" "}
                                For example, vendors that host or maintain our
                                websites and send promotional emails for us may
                                give us information. Our marketing agencies,
                                advertising technology vendors, and analytics
                                providers may also provide us with information.
                            </p>
                            <p>
                                <strong className="text-[#1a1f2c]">
                                    We receive information about you from other
                                    sources.
                                </strong>{" "}
                                Other parties may give us personal information
                                about you. These other parties might also
                                include business and marketing partners and
                                social media platforms that give us information
                                they have collected either directly or
                                indirectly from you.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We share your personal information with other
                                parties.
                            </h2>
                            <p className="mb-4">
                                We share personal information under the
                                following circumstances:
                            </p>
                            <p className="mb-4">
                                We may share each category of personal
                                information within the 900 Vermont, LLC family
                                of companies. This may include our parent,
                                subsidiaries, affiliates, and business units. We
                                may also share personal information with
                                subsidiaries, affiliates, and business units of
                                our parent company. We share personal
                                information within the 900 Vermont, LLC family
                                of companies for all purposes described in this
                                Privacy Policy.
                            </p>
                            <p className="mb-4">
                                We share your personal information with vendors
                                and service providers who perform services on
                                our behalf. We may share personal information
                                with vendors who assist us with the uses of
                                personal information described in this Privacy
                                Policy. This may include vendors who send emails
                                for us, help us manage and operate our websites
                                and apps, manage our properties, fulfill
                                purchases, manage rent payments, provide tenant
                                and guest services, provide advertising or
                                marketing services, provide analytics and search
                                engine support, track advertising impressions,
                                investigate and prevent data incidents, provide
                                physical and digital security services, audit
                                our business and financial statements, vet job
                                applicants, provide legal advice, and place our
                                advertisements on other platforms.Personal
                                information received by vendors may also be
                                subject to their privacy policies.
                            </p>
                            <p className="mb-4">
                                We may share your personal information with our
                                business partners and marketing companies. We
                                might share information with third parties who
                                co-sponsor a promotion or promote our services.
                                Some of these partners may send you information
                                about products or services by mail or email.
                                They may share your information with other third
                                parties. We may also share the above categories
                                of personal information with companies that help
                                us with our marketing efforts, including social
                                media platforms, advertising networks, and ad
                                tech companies. For example, we may share email
                                addresses of other contact information with
                                social media platforms so they can serve our
                                advertising to you on their platform. Personal
                                information received by our partners may also be
                                subject to their privacy policies.
                            </p>
                            <p className="mb-4">
                                We will share your personal information if we
                                think we have to in order to comply with the law
                                or to protect ourselves, our customers and
                                others. We may share any or all categories of
                                personal information to respond to a court order
                                or subpoena. We may also share this personal
                                information if a government agency or
                                investigatory body requests it. We might share
                                your personal information in order to enforce
                                our agreements and to protect our rights and/or
                                the rights of others. We might share your
                                personal information when we are investigating
                                potential fraud. This might include fraud we
                                think has happened during a promotion. If you
                                are the winner of a sweepstakes or contest, we
                                may also share your certain Contact Information
                                with anyone who requests a winner’s list.
                            </p>
                            <p className="mb-4">
                                We may share your personal information as part
                                of a transaction, financing, or for other
                                business needs. For example, if 900 Vermont, LLC
                                sells any of its businesses or assets, applies
                                for loans, or opens bank accounts, we may
                                disclose your personal information to the
                                prospective buyer, lender or bank, as the case
                                may be, as part of certain due diligence
                                processes. We also share information for the
                                purpose of management and administration of 900
                                Vermont, LLC’s business.
                            </p>
                            <p>
                                We may share your personal information with a
                                successor to all or part of our business. If
                                part of our business (including any of our
                                affiliates, divisions, and business units) is
                                acquired by a third party, we may include
                                personal information as part of that
                                transaction, which may include some or all
                                categories of your personal information. We may
                                also share your personal information if there is
                                a similar change to our corporate structure. We
                                may also share your information with others as
                                they conduct diligence of our corporate changes.
                            </p>
                            <p>
                                We may share personal information for other
                                reasons we may describe to you from time to time
                                or as permitted by law.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                You have certain choices about how we use your
                                personal information.
                            </h2>
                            <p className="mb-4">
                                You can opt out of receiving our marketing
                                emails and text messages. To stop receiving our
                                promotional emails, you can follow the
                                instructions in any promotional message you get
                                from us. If you receive promotional text
                                messages from us, you may opt-out by replying
                                “STOP”. Even if you opt out of getting marketing
                                messages, we will still send you transactional
                                messages. These include responses to your
                                questions.
                            </p>
                            <p className="mb-4">
                                You can control if we share information with
                                third parties for their marketing purposes. To
                                opt out of having us share your information with
                                third parties for their promotional purposes,
                                please send an email to{" "}
                                <Link
                                    to="mailto:info@the900apts.com"
                                    className="text-[#c77950] hover:underline"
                                >
                                    info@the900apts.com
                                </Link>
                                .
                            </p>
                            <p className="mb-4">
                                You can control certain cookies and tracking
                                tools. 900 Vermont, LLC and 900 Vermont, LLC's
                                service providers may use “cookies” in
                                connection with the Site. Cookies are data that
                                a web server transfers to an individual's
                                computer for recordkeeping and other purposes.
                                Cookies are an industry standard used by most
                                websites, and can facilitate users' ongoing
                                access to and use of a particular website;
                                cookies do not cause damage to your computer
                                systems or files. Your browser may also give you
                                the ability to control cookies or other tracking
                                tools. How you do so depends on the type of
                                tool. Certain browsers can be set to reject
                                browser cookies. Since flash cookies do not
                                reside in your browser, your browser settings
                                will not affect them. To control flash cookies,
                                you thus need to click here.
                            </p>
                            <p>
                                We and third party advertising networks, social
                                media companies, and other services may collect
                                information about your use of our websites and
                                apps over time so that they or we may display
                                interest-based advertising using information
                                gathered about you over time across multiple
                                website or other platforms. To do this, we and
                                our vendors use several common tracking tools,
                                such as browser cookies, web beacons, and
                                similar technologies. To set your preferences
                                related to this type of information collection
                                and use, click here and here. We may use Google
                                Analytics to better understand how our users
                                interact with our websites. You can learn about
                                Google Analytics’ currently available opt-outs
                                at{" "}
                                <Link
                                    href={
                                        "https://tools.google.com/dlpage/gaoptout/"
                                    }
                                >
                                    https://tools.google.com/dlpage/gaoptout/.
                                </Link>
                            </p>
                            <p>
                                Some browsers have “do not track” features that
                                allow you to tell a website not to track you.
                                These features are not all uniform. We do not
                                currently respond to those signals. If you block
                                cookies, certain features on our site may not
                                work. If you block or reject cookies, not all of
                                the tracking described here will stop. 900
                                Vermont, LLC may not be aware of or able to
                                honor and respond to every such mechanism. more
                                information about “do not track”, please visit
                                www.allaboutdnt.org.
                            </p>
                            <p>
                                Options you select are browser, website and
                                device specific. If you clear your cookies or
                                your browser’s cache, you will need to set your
                                preferences again.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                Your California Privacy Rights.
                            </h2>
                            <p className="mb-4">
                                If you reside in California, you have the right
                                to ask us one time each year if we have shared
                                personal information with third parties for
                                their direct marketing purposes. To make a
                                request, please send us an email, or write to us
                                at the address listed below. Indicate in your
                                letter that you are a California resident making
                                a “Shine the Light” inquiry.
                            </p>
                            <p className="mb-4">
                                If you reside in California, you can make the
                                following more specific requests with respect to
                                your personal information:
                            </p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    <strong>Access</strong> – ou can request
                                    that we disclose to you the categories of
                                    personal information we collected about you,
                                    the categories of sources from which we
                                    collected the personal information, the
                                    categories of personal information we sold
                                    or disclosed, our business or commercial
                                    purpose for collecting and selling the
                                    personal information, the categories of
                                    third parties with whom we shared the
                                    personal information, and the specific
                                    pieces of personal information we collected
                                    about you over the past 12 months.
                                </li>
                                <li>
                                    <strong>Deletion</strong> – You can request
                                    that we delete your personal information
                                    that we maintain about you, subject to
                                    certain exceptions.
                                </li>
                                <li>
                                    <strong>Do Not Sell My Info</strong> – You
                                    can request that we not sell your personal
                                    information by sending an email to{" "}
                                    <Link
                                        to="mailto:info@the900apts.com"
                                        className="text-[#c77950] hover:underline"
                                    >
                                        info@the900apts.com
                                    </Link>{" "}
                                    with the subject line “CCPA Rights” or by
                                    filling in the form below. For purposes of
                                    this Privacy Policy, “sell” means the sale
                                    of your personal information to an outside
                                    party for monetary or other valuable
                                    consideration, subject to certain exceptions
                                    set forth in applicable California law. Any
                                    opt-out of cookie-based tracking for
                                    advertising purposes is specific to the
                                    device, website, and browser you are using,
                                    and is deleted whenever you clear your
                                    browser’s cache.
                                </li>
                            </ul>
                            <p className="mt-4">
                                900 Vermont, LLC will not discriminate against
                                you because you made any of these requests.
                            </p>
                            <p className="mt-4">
                                California residents can make these requests
                                online by emailing us at{" "}
                                <Link
                                    to="mailto:info@the900apts.com"
                                    className="text-[#c77950] hover:underline"
                                >
                                    info@the900apts.com
                                </Link>
                                . We may deny certain requests, or fulfill a
                                request only in part, based on our legal rights
                                and obligations. For example, we may retain
                                personal information as permitted by law, such
                                as for tax or other record keeping purposes, to
                                maintain an active account, and to process
                                transactions and facilitate customer requests.
                                Note that for purposes of these requests under
                                this Privacy Policy, personal information does
                                not include information about job applicants,
                                employees and other of our personnel;
                                information about employees and other
                                representatives of third-party entities we may
                                interact with; or information we have collected
                                as a service provider to our clients.
                            </p>
                            <p className="mt-4">
                                We will take reasonable steps to verify your
                                identity prior to responding to your requests.
                                The verification steps will vary depending on
                                the sensitivity of the personal information and
                                whether you have an account with us.
                            </p>
                            <p className="mt-4">
                                California residents may designate an authorized
                                agent to make a request on their behalf. When
                                submitting the request, please ensure the
                                authorized agent is identified as an authorized
                                agent.
                            </p>
                            <p>
                                For purposes of making these requests, please
                                also note the following regarding how we collect
                                and use your personal information as described
                                in this policy, including in the previous 12
                                months:
                            </p>
                            <ul>
                                <li>
                                    We may collect, and use for our business and
                                    commercial purposes, the following
                                    categories of personal information as set
                                    forth in applicable California law:
                                    Identifiers; payment and customer records
                                    information; characteristics of protected
                                    classifications under California or federal
                                    law; commercial information; professional or
                                    employment information; internet or other
                                    electronic network activity information;
                                    geolocation data; audio, electronic or
                                    visual information; and inferences. We
                                    collect this personal information from the
                                    sources described above.
                                </li>
                                <li>
                                    We may disclose each of the foregoing
                                    categories of personal information for the
                                    business purposes described in this Privacy
                                    Policy to the extent permitted by applicable
                                    law.
                                </li>
                                <li>
                                    We may sell the following categories of
                                    personal information: Identifiers;
                                    commercial information; Internet or other
                                    electronic network activity; geolocation
                                    data; and inferences.
                                </li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                Our websites and services are not intended for
                                children.
                            </h2>
                            <p>
                                900 Vermont, LLC’s websites and our services are
                                meant for adults and are not directed to
                                children under the age of 16. We do not
                                knowingly collect personal information from
                                children under 16. If 900 Vermont, LLC becomes
                                aware that 900 Vermont, LLC received personal
                                information from someone under the age of 16,
                                900 Vermont, LLC will take steps to delete such
                                information from 900 Vermont, LLC’s records. If
                                you are a parent or legal guardian and think
                                your child has given us information, you can
                                contact us at{" "}
                                <Link
                                    to="mailto:info@the900apts.com"
                                    className="text-[#c77950] hover:underline"
                                >
                                    info@the900apts.com
                                </Link>
                                .
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We use standard security measures.
                            </h2>
                            <p>
                                Despite 900 Vermont, LLC’s efforts, no website,
                                mobile application database, or system is
                                completely secure of “hack proof”. We cannot
                                promise that your use of our websites, apps, or
                                services will be completely safe. Any
                                transmission of your data to our websites is at
                                your own risk. We encourage you to use caution
                                when using the Internet. We keep personal
                                information as long as it is necessary or
                                relevant for the practices described in this
                                Privacy Policy. We also keep information as
                                otherwise required by law. Personal information
                                may be accessed by persons within our
                                organization, or our third party vendors, and
                                those other parties described in this Privacy
                                Policy, who require such access to carry out the
                                purposes described in this Privacy Policy, and
                                such other purposes as permitted or required by
                                applicable law.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We may link to third party sites or services we
                                don't control.
                            </h2>
                            <p>
                                If you click on a link to a third party site or
                                a third party app, you will be taken to a
                                website or service we do not control. This
                                Privacy Policy does not apply to the privacy
                                practices of that website or services, which may
                                collect information from you. Read the privacy
                                policy of other websites, apps, and services
                                carefully. We are not responsible for these
                                third party websites or services or their
                                policies. At certain public locations operated
                                by 900 Vermont, LLC, guests who wish to access
                                Wi-Fi services may be required to agree to a
                                different privacy policy at the time of access.
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                Correct or Update Your Personal Information
                            </h2>
                            <p>
                                You have the right to request that 900 Vermont,
                                LLC corrects or supplements your Personal
                                Information if the data are factually inaccurate
                                or incomplete. If you wish to exercise your
                                rights or if you have any questions regarding
                                your Personal Information, please contact 900
                                Vermont, LLC at{" "}
                                <Link
                                    to="mailto:info@the900apts.com"
                                    className="text-[#c77950] hover:underline"
                                >
                                    info@the900apts.com
                                </Link>
                                .
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                Feel free to contact us.
                            </h2>
                            <p>
                                If you have any questions about this Privacy
                                Policy or want to access, correct or update your
                                information, please email us at{" "}
                                <Link
                                    to="mailto:info@the900apts.com"
                                    className="text-[#c77950] hover:underline"
                                >
                                    info@the900apts.com
                                </Link>
                                .
                            </p>
                        </article>

                        <article>
                            <h2 className="mb-4 text-2xl font-bold text-[#c77950]">
                                We may update this Privacy Policy.
                            </h2>
                            <p>
                                From time to time we may change this Privacy
                                Policy. We will notify you of any material
                                changes to our Privacy Policy to the extent
                                required by law. We will also post an updated
                                copy on our websites. Please check our websites
                                periodically for updates. Your continued use of
                                our websites means that you consent to the
                                collection, use and disclosure of your personal
                                information as set out in the updated Privacy
                                Policy.
                            </p>
                        </article>
                    </section>
                </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;
