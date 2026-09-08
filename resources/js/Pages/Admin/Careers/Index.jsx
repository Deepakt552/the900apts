import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import {
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Loader2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Star
} from 'lucide-react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

export default function Index({ applications, stats, filters }) {
  const { flash } = usePage().props;
  const [search, setSearch] = useState(filters?.search || '');
  const [statusFilter, setStatusFilter] = useState(filters?.status || '');
  const [skillFilter, setSkillFilter] = useState(filters?.skill_level || '');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleSearch = (e) => {
    e.preventDefault();
    setProcessing(true);
    router.get('/admin/careers', { search, status: statusFilter, skill_level: skillFilter }, {
      preserveState: true,
      onFinish: () => setProcessing(false)
    });
  };

  const handleFilter = (type, value) => {
    if (type === 'status') {
      setStatusFilter(value);
    } else {
      setSkillFilter(value);
    }

    setProcessing(true);
    router.get('/admin/careers', { search, status: type === 'status' ? value : statusFilter, skill_level: type === 'skill' ? value : skillFilter }, {
      preserveState: true,
      onFinish: () => setProcessing(false)
    });
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Delete Application',
      html: `Are you sure you want to delete <strong>${name}</strong>'s application?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f1424b',
      cancelButtonColor: '#1d294d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading('Deleting application...');
        router.delete(`/admin/careers/${id}`, {
          onSuccess: () => {
            toast.dismiss(loadingToast);
            toast.success('Application deleted successfully');
          },
          onError: () => {
            toast.dismiss(loadingToast);
            toast.error('Failed to delete application');
          }
        });
      }
    });
  };

  const handleDownloadResume = (id) => {
    window.open(`/admin/careers/${id}/download-resume`, '_blank');
  };

  const statsConfig = [
    {
      label: 'Total Applications',
      value: stats.total,
      icon: Briefcase,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      label: 'Reviewed',
      value: stats.reviewed,
      icon: Users,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    {
      label: 'Shortlisted',
      value: stats.shortlisted,
      icon: Star,
      color: 'bg-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    shortlisted: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
          <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
            Career Applications
          </h1>
        </div>
      }
    >
      <Head title="Career Applications · The 900 Residences" />

      <Toaster position="top-right" />

      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
              Job Application Inquiries
            </h2>
            <p className="mt-1 text-xs text-[#5a627a] font-medium">
              Manage candidate profiles, resumes, and hiring statuses
            </p>
          </div>
        </div>

        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {statsConfig.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] hover:shadow-md transition-all hover:border-[#c77950]/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8] truncate">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#1a1f2c]">
                    {stat.value}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#c77950]/10 border border-[#c77950]/20 text-[#c77950]">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-4 sm:p-5 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c94a8]" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone or skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d6d8e5] rounded-xl text-xs sm:text-sm text-[#1a1f2c] placeholder-[#8c94a8] focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                />
                {processing && (
                  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[#c77950]" />
                )}
              </div>
            </form>

            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#c77950]" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleFilter('status', e.target.value)}
                  className="pl-8 pr-6 py-2.5 bg-white border border-[#d6d8e5] rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1f2c] focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <select
                value={skillFilter}
                onChange={(e) => handleFilter('skill', e.target.value)}
                className="px-4 py-2.5 bg-white border border-[#d6d8e5] rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1f2c] focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
              >
                <option value="">All Skills</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="experienced">Experienced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Luxury Candidates Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-xs">
              <thead className="bg-[#f6f7fa] border-b border-[#e8e9f0]">
                <tr>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">#</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">Candidate</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider hidden lg:table-cell">Skill Level</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider hidden xl:table-cell">Resume</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider hidden lg:table-cell">Applied</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e9f0]">
                {applications.data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-12 text-center text-[#8c94a8]">
                      <FileText className="h-10 w-10 mx-auto mb-2 text-[#d6d8e5]" />
                      <p className="text-sm font-bold text-[#1a1f2c]">No applications found</p>
                      <p className="text-xs mt-1 text-[#8c94a8]">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  applications.data.map((application, index) => (
                    <tr
                      key={application.id}
                      className="hover:bg-[#f6f7fa]/80 transition-colors"
                    >
                      <td className="px-5 py-4 text-[#8c94a8] font-bold">
                        {applications.from + index}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-[#c77950] text-xs font-bold shadow-2xs">
                            {application.full_name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-[#1a1f2c] truncate max-w-[130px]">
                            {application.full_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#5a627a] hidden sm:table-cell font-medium">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-[#c77950]" />
                          <span className="truncate max-w-[150px]">{application.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#5a627a] hidden md:table-cell font-medium">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-[#c77950]" />
                          <span>{application.phone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#f6f7fa] border border-[#d6d8e5] text-[#5a627a]">
                          {application.skill_level}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                          application.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          application.status === 'reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          application.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden xl:table-cell">
                        <button
                          onClick={() => handleDownloadResume(application.id)}
                          className="inline-flex items-center gap-1 text-[#c77950] hover:text-[#994e2e] font-bold text-xs hover:underline"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          View PDF
                        </button>
                      </td>
                      <td className="px-5 py-4 text-[11px] text-[#8c94a8] hidden lg:table-cell whitespace-nowrap">
                        {new Date(application.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => router.get(`/admin/careers/${application.id}`)}
                            className="p-2 rounded-xl text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadResume(application.id)}
                            className="p-2 rounded-xl text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 transition-colors"
                            title="Download Resume"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(application.id, application.full_name)}
                            className="p-2 rounded-xl text-[#8c94a8] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {applications.data.length > 0 && (
            <div className="px-5 py-4 border-t border-[#e8e9f0] bg-[#fafbfe]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs text-[#5a627a]">
                  Showing {applications.from} to {applications.to} of {applications.total} entries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.get('/admin/careers', { ...filters, page: applications.current_page - 1 })}
                    disabled={!applications.prev_page_url}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#d6d8e5] bg-white text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => router.get('/admin/careers', { ...filters, page: applications.current_page + 1 })}
                    disabled={!applications.next_page_url}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#d6d8e5] bg-white text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}