import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Heart, Sparkles } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [bouquetName, setBouquetName] = useState('Quevo Royal Passion 100 Roses Box');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    onAddReview({
      author,
      location: location || 'Kigali, Rwanda',
      rating,
      comment,
      bouquetName,
    });

    setSubmittedFeedback(true);
    setTimeout(() => {
      setShowAddForm(false);
      setSubmittedFeedback(false);
      setAuthor('');
      setComment('');
    }, 1200);
  };

  return (
    <section id="reviews-section" className="py-16 lg:py-24 bg-[#FFFDFB] border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="font-script text-2xl text-rose-800 block mb-1">
              Words from the Heart
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Loved by Kigali &amp; Loved Ones Worldwide
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Discover real moments of surprise, anniversary tears of joy, and unforgettable wedding memories created with Quevo Flowers &amp; Decor.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start md:self-auto flex items-center gap-2 border border-rose-300 bg-rose-50/80 hover:bg-rose-100 text-rose-900 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-rose-700" />
            <span>{showAddForm ? 'Close Form' : 'Write a Customer Review'}</span>
          </button>
        </div>

        {/* Add Review Form Dropdown */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 p-6 rounded-3xl bg-rose-50/60 border border-rose-200 shadow-sm max-w-2xl mx-auto text-left space-y-4 animate-in slide-in-from-top-3 duration-200"
          >
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Share Your Quevo Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Marie Claire K."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">City / Neighborhood</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kigali, Kiyovu or London"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Arrangement / Bouquet</label>
                <input
                  type="text"
                  value={bouquetName}
                  onChange={(e) => setBouquetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Rating</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Your Review *</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How did the flowers look? How did the recipient react?"
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:border-rose-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose-900 hover:bg-rose-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {submittedFeedback ? 'Thank You!' : 'Post Review'}
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid (clean editorial cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-rose-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-rose-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="Verified Customer" className="inline-flex">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-400">{rev.location}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-[10px] text-rose-800 font-medium mt-1 truncate">
                  Ordered: {rev.bouquetName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
