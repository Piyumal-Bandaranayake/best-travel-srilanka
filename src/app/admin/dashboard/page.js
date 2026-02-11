'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, CheckCircle, XCircle, Trash2, Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews?all=true', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      console.log('Approving review with ID:', id);
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
      });
      
      const data = await res.json();
      console.log('Approval response:', data);
      
      if (res.ok && data.success) {
        // Optimistically update UI
        setReviews(reviews.map(r => r._id === id ? { ...r, isApproved: true } : r));
        console.log('Review approved successfully');
      } else {
        console.error('Failed to approve:', data.message);
        alert(`Failed to approve review: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to approve review:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
  };

  const filteredReviews = reviews.filter(r => 
    activeTab === 'pending' ? !r.isApproved : r.isApproved
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-outfit">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-primary-green tracking-tight">ADMIN PANEL</h2>
          <p className="text-xs text-gray-400 font-medium">Best Travel Sri Lanka</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary-green/5 text-primary-green rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Reviews
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
              <p className="text-gray-500 text-sm mt-1">Manage customer feedback</p>
            </div>
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-900">
              <LogOut className="w-6 h-6" />
            </button>
          </header>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 px-2 text-sm font-bold transition-colors relative ${
                activeTab === 'pending' ? 'text-primary-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Pending Approval
              <span className="ml-2 bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                {reviews.filter(r => !r.isApproved).length}
              </span>
              {activeTab === 'pending' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-green" />}
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`pb-3 px-2 text-sm font-bold transition-colors relative ${
                activeTab === 'approved' ? 'text-primary-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Approved Reviews
              <span className="ml-2 bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full">
                {reviews.filter(r => r.isApproved).length}
              </span>
              {activeTab === 'approved' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-green" />}
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredReviews.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1">No reviews found</h3>
                  <p className="text-gray-400 text-sm">There are no reviews in this category yet.</p>
                </motion.div>
              ) : (
                filteredReviews.map((review) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={review._id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 md:items-center"
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">{review.name}</h3>
                        <span className="text-xs font-medium text-gray-400 px-2 py-1 bg-gray-50 rounded-md">
                          {review.country}
                        </span>
                        <div className="flex items-center gap-1 ml-auto md:ml-0 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">"{review.feedback}"</p>
                      <p className="text-xs text-gray-400 mt-3">
                        Submitted on {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                      {!review.isApproved && (
                        <button
                          onClick={() => handleApprove(review._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors text-xs font-bold uppercase tracking-wider"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-xs font-bold uppercase tracking-wider"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
