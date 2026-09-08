import React, { useState, useEffect } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import CommentBox from '@/Components/Blog/Comment';
import BlogCard from '@/Components/Blog/BlogCard';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import APP_CONFIG from "./config";

// Create a modal component for login prompt
export const LoginPromptModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark-400 bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-dark-50 rounded-2xl w-full max-w-md overflow-hidden border border-gold-400/20">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-400/20">
            <i className="fas fa-lock text-gold-400 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Login Required
          </h3>
          <p className="text-gray-300 mb-6">
            Please login to interact with articles. You need an account to like or comment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onLogin}
              className="px-5 py-3 bg-gold-400 text-dark-500 font-medium rounded-lg hover:bg-gold-500 transition-colors"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Go to Login
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-dark-200 text-gray-300 font-medium rounded-lg hover:bg-dark-100 transition-colors border border-dark-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a modal component for comments
export const CommentModal = ({
  isOpen,
  onClose,
  blogId,
  blogTitle,
  comments = [],
  onAddComment,
  isLoggedIn
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState(comments);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCommentText('');
      setLocalComments(comments);
    }
  }, [isOpen, comments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    if (!isLoggedIn) {
      onClose();
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = {
        id: Date.now(),
        user: {
          name: 'Current User',
          avatar: null
        },
        content: commentText,
        created_at: new Date().toISOString(),
        likes: 0
      };

      setLocalComments(prev => [newComment, ...prev]);
      setCommentText('');

      if (onAddComment) {
        onAddComment(blogId, commentText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId) => {
    if (!isLoggedIn) return;

    setLocalComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: (comment.likes || 0) + 1 }
        : comment
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark-400 bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-dark-50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-gold-400/20">
        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-gold-400/20 flex justify-between items-center bg-gradient-to-r from-dark-50 to-dark-300">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-white">
              Comments
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {blogTitle}/{blogId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Comment Input */}
        <div className="p-4 md:p-6 border-b border-gold-400/20">
          <CommentBox postId={blogId} />
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gold-400/20 bg-dark-300">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {localComments.length} {localComments.length === 1 ? 'comment' : 'comments'}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-dark-200 text-gray-300 font-medium rounded-lg hover:bg-dark-100 transition-colors border border-dark-100"
              >
                Close
              </button>
              {!isLoggedIn && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gold-400 text-dark-500 font-medium rounded-lg hover:bg-gold-500 transition-colors"
                >
                  Login to Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogSearch = () => {
  const { props } = usePage();
  const { auth } = props;
  const isLoggedIn = auth?.user ? true : false;

  // Safely extract props with defaults
  const blogs = props?.blogs || [];
  console.log(blogs);
  const categories = props?.categories || [];
  const filters = props?.filters || { search: '', category: 'all' };
  const pagination = props?.pagination || {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 9,
    has_more_pages: false
  };

  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [hasMore, setHasMore] = useState(pagination.has_more_pages);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const [selectedBlogForComment, setSelectedBlogForComment] = useState(null);

  // Format categories for frontend
  const allCategories = [
    { id: 'all', name: 'All', icon: 'fas fa-layer-group' },
    ...categories.map(cat => ({
      id: cat?.id?.toString() || '',
      name: cat?.name || 'Uncategorized',
      icon: getCategoryIcon(cat?.name)
    }))
  ];

  function getCategoryIcon(categoryName) {
    if (!categoryName) return 'fas fa-folder';

    const iconMap = {
      'Property Tips': 'fas fa-home',
      'Market Trends': 'fas fa-chart-line',
      'Resident Guides': 'fas fa-users',
      'Maintenance': 'fas fa-tools',
      'Community': 'fas fa-handshake',
      'Industry News': 'fas fa-newspaper'
    };

    return iconMap[categoryName] || 'fas fa-folder';
  }

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update when props change
  useEffect(() => {
    setFilteredBlogs(blogs);
    setSelectedCategory(filters.category || 'all');
    setSearchQuery(filters.search || '');
    setCurrentPage(pagination.current_page);
    setHasMore(pagination.has_more_pages);
  }, [blogs, filters, pagination]);

  // Handle search with debounce
  const handleSearch = (query) => {
    setSearchQuery(query);

    const timeoutId = setTimeout(() => {
      router.get(route('blog'), {
        search: query,
        category: selectedCategory !== 'all' ? selectedCategory : null,
        page: 1
      }, {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);

    router.get(route('blog'), {
      search: searchQuery || null,
      category: categoryId !== 'all' ? categoryId : null,
      page: 1
    }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });

    if (isMobile) setShowAllCategories(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowAllCategories(false);

    router.get(route('blog'), {}, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  // Load more articles via AJAX
  const loadMoreArticles = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;

      const params = new URLSearchParams({
        page: nextPage,
        search: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : ''
      });

      const response = await fetch(route('blogs.load-more') + `?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || data.error);
      }

      if (data.blogs && data.blogs.length > 0) {
        setFilteredBlogs(prev => [...prev, ...data.blogs]);
        setCurrentPage(nextPage);
        setHasMore(data.has_more);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
      alert('Failed to load more articles: ' + error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Get visible categories
  const getVisibleCategories = () => {
    if (!isMobile || showAllCategories) {
      return allCategories;
    }
    return [...allCategories.slice(0, 4), { id: 'more', name: 'More', icon: 'fas fa-ellipsis-h' }];
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    router.get(route('login'));
  };

  const handleAddComment = (blogId, commentText) => {
    // Update comments count for the blog
    const blog = filteredBlogs.find(b => b.id === blogId);
    if (blog) {
      const updatedBlogs = filteredBlogs.map(b =>
        b.id === blogId
          ? { ...b, comments: (b.comments || 0) + 1 }
          : b
      );
      setFilteredBlogs(updatedBlogs);
    }

    // Add to commented blogs set
    setCommentedBlogs(prev => new Set([...prev, blogId]));

    // Store the comment
    const comment = {
      id: Date.now(),
      user: {
        name: auth?.user?.name || 'You',
        avatar: null
      },
      content: commentText,
      created_at: new Date().toISOString(),
      likes: 0
    };

    setBlogComments(prev => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), comment]
    }));
  };

  return (
    <div className="min-h-screen bg-dark-500 p-3 md:p-8">
      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Comment Modal */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => {
          setShowCommentModal(false);
          setSelectedBlogForComment(null);
        }}
        blogId={selectedBlogForComment?.id}
        blogTitle={selectedBlogForComment?.title}
        comments={selectedBlogForComment?.comments || []}
        onAddComment={handleAddComment}
        isLoggedIn={isLoggedIn}
      />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8" data-aos="zoom-in">
        <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
          Discover expert advice, market trends, and practical tips
        </p>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-500 text-sm md:text-base"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3.5 bg-dark-50 border border-gold-400/30 rounded-lg md:rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent shadow-sm text-sm md:text-base text-white placeholder-gray-500"
              disabled={isLoading}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center hover:text-gray-300"
                disabled={isLoading}
              >
                <i className="fas fa-times text-gray-500 hover:text-gray-300 text-sm md:text-base"></i>
              </button>
            )}
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center">
                <i className="fas fa-spinner fa-spin text-gold-400 text-sm md:text-base"></i>
              </div>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-dark-400 bg-opacity-60 z-40 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-dark-50 p-6 rounded-xl shadow-lg border border-gold-400/20">
              <i className="fas fa-spinner fa-spin text-gold-400 text-2xl"></i>
              <span className="ml-2 text-white">Loading...</span>
            </div>
          </div>
        )}

        {/* Mobile Category Modal */}
        {isMobile && showAllCategories && (
          <div className="fixed inset-0 bg-dark-400 bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-dark-50 rounded-2xl w-full max-w-sm max-h-[80vh] overflow-hidden border border-gold-400/20">
              <div className="p-4 border-b border-gold-400/20 flex justify-between items-center">
                <h3 className="font-semibold text-white">Select Category</h3>
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? 'bg-gold-400 text-dark-500 shadow-lg shadow-gold-400/20'
                          : 'bg-dark-200 text-gray-300 hover:bg-dark-100 hover:text-white'
                      }`}
                    >
                      <i className={`${category.icon} text-lg mb-2`}></i>
                      <span className="font-medium text-xs text-center">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gold-400/20">
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="w-full py-3 bg-dark-200 text-gray-300 font-medium rounded-lg hover:bg-dark-100 transition-colors border border-dark-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Category/Type Filters */}
          <div className="w-full md:flex-1 overflow-x-auto">
            <div className="flex space-x-2 pb-1 md:pb-2">
              {getVisibleCategories().map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    if (category.id === 'more') {
                      setShowAllCategories(true);
                    } else {
                      handleCategoryFilter(category.id);
                    }
                  }}
                  className={`flex items-center px-3 md:px-4 py-2 md:py-2.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === category.id
                      ? 'bg-gold-400 text-dark-500 shadow-lg shadow-gold-400/20'
                      : category.id === 'more'
                        ? 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:text-white'
                        : 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:text-white'
                  }`}
                >
                  <i className={`${category.icon} mr-1.5 md:mr-2 text-xs md:text-sm`}></i>
                  <span className="font-medium text-xs md:text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 mt-3 md:mt-0 w-full md:w-auto">
            <div className="md:hidden flex-1">
              <span className="text-xs text-gray-400 bg-dark-200 px-2.5 py-1.5 rounded-lg">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="flex items-center px-3 md:px-4 py-1.5 md:py-2.5 text-xs md:text-sm font-medium text-gray-300 bg-dark-200 rounded-lg hover:bg-dark-100 transition-colors"
              >
                <i className="fas fa-times mr-1 md:mr-2 text-xs"></i>
                <span className="hidden md:inline">Clear</span>
                <span className="md:hidden">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-white" data-aos="zoom-in">
              Latest Articles
              {selectedCategory !== 'all' && (
                <span className="text-gold-400 ml-1 md:ml-2 text-sm md:text-base">
                  • {allCategories.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </h2>
            {searchQuery && (
              <p className="text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
                Searching for: "<span className="font-medium text-gold-400">{searchQuery}</span>"
              </p>
            )}
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-400 bg-dark-200 px-3 py-1.5 rounded-lg">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>

        {!isLoading && filteredBlogs.length === 0 ? (
          <div className="text-center py-10 md:py-16 bg-dark-50 rounded-xl md:rounded-2xl border border-gold-400/20">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-dark-200 rounded-full mb-4 md:mb-6">
              <i className="fas fa-search text-2xl md:text-3xl text-gray-500"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
              No articles found
            </h3>
            <p className="text-gray-400 mb-4 md:mb-6 max-w-md mx-auto px-4 md:px-0 text-sm md:text-base">
              {searchQuery
                ? `No results found for "${searchQuery}". Try different keywords or clear filters.`
                : "No articles match the selected filters. Try selecting a different category."}
            </p>
            <button
              onClick={clearFilters}
              className="px-5 md:px-6 py-2.5 md:py-3 bg-gold-400 text-dark-500 font-medium rounded-lg md:rounded-xl hover:bg-gold-500 transition-colors inline-flex items-center text-sm md:text-base"
            >
              <i className="fas fa-redo mr-1.5 md:mr-2 text-xs"></i>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredBlogs.map(blog => (
                  <BlogCard 
                    key={blog.id} 
                    onAddComment={handleAddComment} 
                    blog={blog} 
                    setShowLoginModal={setShowLoginModal} 
                    setSelectedBlogForComment={setSelectedBlogForComment} 
                    setShowCommentModal={setShowCommentModal}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {filteredBlogs.map(blog => (
                  <div key={blog.id}>
                    {/* List view content */}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {hasMore && filteredBlogs.length > 0 && (
          <div className="text-center mt-6 md:mt-10">
            <button
              onClick={loadMoreArticles}
              disabled={isLoadingMore}
              className="px-6 md:px-8 py-2.5 md:py-3.5 bg-dark-50 border border-gold-400/30 text-gray-300 font-medium rounded-lg md:rounded-xl hover:bg-dark-200 hover:border-gold-400 transition-all shadow-sm hover:shadow-gold-400/10 inline-flex items-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-1.5 md:mr-2 text-xs md:text-sm text-gold-400"></i>
                  Loading...
                </>
              ) : (
                <>
                  <i className="fas fa-plus mr-1.5 md:mr-2 text-xs md:text-sm text-gold-400"></i>
                  Load More Articles
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
          button, input, [role="button"] {
            font-size: 16px; /* Prevents iOS zoom on focus */
          }
          
          .line-clamp-2 {
            -webkit-line-clamp: 2;
          }
          .line-clamp-3 {
            -webkit-line-clamp: 2;
          }
        }
        
        /* Responsive image loading */
        img {
          content-visibility: auto;
        }
        
        /* Scrollbar styling for category filters */
        .overflow-x-auto::-webkit-scrollbar {
          height: 3px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #1c2840;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #c5a059;
        }
      `}</style>
    </div>
  );
};

export default function Blog() {
  const { auth } = usePage().props;
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full h-[620px] flex md:items-start items-start md:py-0 py-10 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            // src="/herohalf.png"
            style={{
                        backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/blogHero.png)`,
                    }}
            alt="Modern skyscrapers"
            className="hidden md:block w-full h-full object-cover object-cover"
          />
          <img
            // src="/heroMobileView.png"
               style={{
                        backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/blogHero.png)`,
                    }}
            alt="Modern skyscrapers"
            className="block md:hidden w-full h-full object-cover object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-dark-500 bg-opacity-60"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-2 relative z-10 text-white" data-aos="zoom-in">
          <div className="w-full md:w-1/2 h-full flex items-center">
            <div className="max-w-xl mx-auto px-6 md:px-10 py-20 text-white">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Blogs &
                <span className="text-gold-400"> Insights</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed mt-10">
                Discover the achievements that set us apart. From groundbreaking projects to industry accolades, we take pride in our accomplishments.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BlogSearch />
      <Footer />
    </>
  );
}