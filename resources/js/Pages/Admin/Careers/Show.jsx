import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Download, 
  ArrowLeft,
  Calendar,
  Briefcase,
  CheckCircle,
  RefreshCw,
  Award,
  Clock,
  ExternalLink,
  Shield,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function Show({ application, statuses }) {
  const { flash } = usePage().props;
  const [selectedStatus, setSelectedStatus] = useState(application.status);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const statusColors = {
    pending: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-500/30',
    reviewed: 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg shadow-blue-500/30',
    shortlisted: 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-lg shadow-emerald-500/30',
    rejected: 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-500/30'
  };

  const statusBadgeColors = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    reviewed: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    shortlisted: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    rejected: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800'
  };

  const skillColors = {
    beginner: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600',
    intermediate: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    experienced: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    expert: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
  };

  const skillIcons = {
    beginner: <TrendingUp className="h-3 w-3" />,
    intermediate: <TrendingUp className="h-3 w-3" />,
    experienced: <Star className="h-3 w-3" />,
    expert: <Award className="h-3 w-3" />
  };

  const statusLabels = {
    pending: 'Pending Review',
    reviewed: 'Reviewed',
    shortlisted: 'Shortlisted',
    rejected: 'Rejected'
  };

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    reviewed: <Users className="h-4 w-4" />,
    shortlisted: <Star className="h-4 w-4" />,
    rejected: <Shield className="h-4 w-4" />
  };

  const handleUpdateStatus = () => {
    Swal.fire({
      title: 'Update Application Status',
      text: 'Are you sure you want to update this application status?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1a2b4c',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Update',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-[#1a2b4c] hover:bg-[#14203a] text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#1a2b4c]/30',
        cancelButton: 'bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-6 py-2.5 rounded-xl transition-all duration-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200',
        popup: 'rounded-2xl shadow-2xl dark:bg-slate-800',
        title: 'text-2xl font-bold text-slate-900 dark:text-slate-100',
        htmlContainer: 'text-slate-600 dark:text-slate-400',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        performUpdate();
      }
    });
  };

  const performUpdate = () => {
    setIsUpdating(true);

    router.put(`/admin/careers/${application.id}/status`, 
      { status: selectedStatus },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setIsUpdating(false);
          Swal.fire({
            title: 'Status Updated!',
            text: 'Application status has been updated successfully.',
            icon: 'success',
            confirmButtonColor: '#1a2b4c',
            confirmButtonText: 'Done',
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              confirmButton: 'bg-[#1a2b4c] hover:bg-[#14203a] text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#1a2b4c]/30',
              popup: 'rounded-2xl shadow-2xl dark:bg-slate-800',
              title: 'text-2xl font-bold text-slate-900 dark:text-slate-100',
              htmlContainer: 'text-slate-600 dark:text-slate-400',
            }
          });
          toast.success('Application status updated successfully!', {
            style: {
              background: '#10b981',
              color: '#fff',
              borderRadius: '12px',
            },
            icon: '✅',
          });
        },
        onError: (errors) => {
          setIsUpdating(false);
          Swal.fire({
            title: 'Update Failed',
            text: errors?.status?.[0] || 'Unable to update application status. Please try again.',
            icon: 'error',
            confirmButtonColor: '#1a2b4c',
            confirmButtonText: 'Try Again',
            customClass: {
              confirmButton: 'bg-[#1a2b4c] hover:bg-[#14203a] text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#1a2b4c]/30',
              popup: 'rounded-2xl shadow-2xl dark:bg-slate-800',
              title: 'text-2xl font-bold text-slate-900 dark:text-slate-100',
              htmlContainer: 'text-slate-600 dark:text-slate-400',
            }
          });
          toast.error('Failed to update application status.', {
            style: {
              background: '#ef4444',
              color: '#fff',
              borderRadius: '12px',
            },
          });
        }
      }
    );
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
          <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
            Application Details
          </h1>
        </div>
      }
    >
      <Head title={`Candidate: ${application.full_name} · The 900 Residences`} />

      <Toaster position="top-right" />

      <div className="w-full space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.get('/admin/careers')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-white hover:bg-[#fafbfe] text-[#1a1f2c] border border-[#d6d8e5] hover:border-[#c77950] shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4 text-[#c77950]" />
              <span>Back to Applications</span>
            </button>
          </div>
          
          <button
            onClick={() => window.open(`/admin/careers/${application.id}/download-resume`, '_blank')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            <span>Download Resume PDF</span>
            <ExternalLink className="h-3 w-3 opacity-75" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Candidate Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Header Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-6 sm:p-7">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-[#c77950] text-2xl font-bold shadow-2xs">
                      {application.full_name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950]">
                      ✦ CANDIDATE PROFILE ✦
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c] mt-0.5">
                      {application.full_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2.5 mt-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                        application.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        application.status === 'reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        application.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {statusLabels[application.status] || application.status}
                      </span>
                      <span className="text-xs text-[#8c94a8] flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3 text-[#c77950]" />
                        Applied {new Date(application.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status Update Select & Action */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3.5 py-2 bg-white border border-[#d6d8e5] rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1f2c] focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                    disabled={isUpdating}
                  >
                    <option value="pending">Pending Review</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  
                  <button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating || selectedStatus === application.status}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all disabled:opacity-40"
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Update Status</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e8e9f0]">
                <div className="p-3.5 rounded-2xl bg-[#f6f7fa] border border-[#e8e9f0]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c77950]/10 text-[#c77950]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Email</p>
                      <p className="text-xs font-bold text-[#1a1f2c] truncate mt-0.5">{application.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f6f7fa] border border-[#e8e9f0]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c77950]/10 text-[#c77950]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Phone</p>
                      <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">{application.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f6f7fa] border border-[#e8e9f0]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c77950]/10 text-[#c77950]">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Skill Level</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white border border-[#d6d8e5] text-[#5a627a]">
                        {application.skill_level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f6f7fa] border border-[#e8e9f0]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c77950]/10 text-[#c77950]">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Submission Date</p>
                      <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                        {new Date(application.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-6">
              <h3 className="text-base font-bold text-[#1a1f2c] mb-3 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                <MapPin className="h-4 w-4 text-[#c77950]" />
                <span>Candidate Address</span>
              </h3>
              <p className="text-xs text-[#1a1f2c] font-medium leading-relaxed">{application.address || "No address specified"}</p>
            </div>
          </div>

          {/* Right Column - Resume & Metadata */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-6">
              <h3 className="text-base font-bold text-[#1a1f2c] mb-4 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                <FileText className="h-4 w-4 text-[#c77950]" />
                <span>Attached Resume</span>
              </h3>
              
              <div className="bg-[#f6f7fa] rounded-2xl p-4 mb-4 border border-[#e8e9f0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-[#c77950]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1a1f2c] truncate">
                      {application.resume_filename || 'Resume_Document.pdf'}
                    </p>
                    <p className="text-[10px] text-[#8c94a8] mt-0.5">
                      Attached on application submission
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(`/admin/careers/${application.id}/download-resume`, '_blank')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// import React, { useEffect } from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, router, usePage } from '@inertiajs/react';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   FileText, 
//   Download, 
//   ArrowLeft,
//   Calendar,
//   Briefcase,
//   CheckCircle
// } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function Show({ application, statuses }) {
//   const { flash } = usePage().props;

//   useEffect(() => {
//     if (flash?.success) {
//       toast.success(flash.success);
//     }
//     if (flash?.error) {
//       toast.error(flash.error);
//     }
//   }, [flash]);

//   const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
//     reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
//     shortlisted: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
//     rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
//   };

//   const skillColors = {
//     beginner: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
//     intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
//     experienced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
//     expert: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
//   };

//   return (
//     <AuthenticatedLayout>
//       <Head title={`Application: ${application.full_name}`} />
      
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
//             color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
//           },
//         }}
//       />

//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.get('/admin/careers')}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Application Details
//               </h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Review candidate application information
//               </p>
//             </div>
//           </div>
          
//           <button
//             onClick={() => window.open(`/admin/careers/${application.id}/download-resume`, '_blank')}
//             className="flex items-center gap-2 px-4 py-2 bg-[#1d294d] dark:bg-[#f1424b] text-white rounded-lg hover:opacity-90 transition-opacity"
//           >
//             <Download className="h-4 w-4" />
//             Download Resume
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Candidate Info */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Profile Card */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-16 h-16 rounded-full bg-[#1d294d] dark:bg-[#f1424b] flex items-center justify-center text-white text-2xl font-bold">
//                   {application.full_name.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                     {application.full_name}
//                   </h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[application.status]}`}>
//                       {application.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3">
//                   <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</p>
//                     <p className="text-gray-900 dark:text-white">{application.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</p>
//                     <p className="text-gray-900 dark:text-white">{application.phone}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Skill Level</p>
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${skillColors[application.skill_level]}`}>
//                       {application.skill_level}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Applied Date</p>
//                     <p className="text-gray-900 dark:text-white">
//                       {new Date(application.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Address Card */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//               <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                 <MapPin className="h-4 w-4" />
//                 Address
//               </h3>
//               <p className="text-gray-900 dark:text-white">{application.address}</p>
//             </div>

//             {/* Agreement Card */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//               <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                 <CheckCircle className="h-4 w-4" />
//                 Agreement
//               </h3>
//               <div className="flex items-center gap-2">
//                 <div className={`w-3 h-3 rounded-full ${application.agree_terms ? 'bg-green-500' : 'bg-red-500'}`} />
//                 <span className="text-gray-900 dark:text-white">
//                   {application.agree_terms ? 'Agreed to terms' : 'Did not agree to terms'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Resume Info */}
//           <div className="space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
//               <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 Resume
//               </h3>
              
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-[#1d294d] dark:bg-[#f1424b] flex items-center justify-center text-white">
//                     <FileText className="h-5 w-5" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                       {application.resume_filename}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Uploaded on {new Date(application.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => window.open(`/admin/careers/${application.id}/download-resume`, '_blank')}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1d294d] dark:bg-[#f1424b] text-white rounded-lg hover:opacity-90 transition-opacity"
//               >
//                 <Download className="h-4 w-4" />
//                 Download Resume
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }