"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlaneTakeoff, Loader2, CheckCircle2 } from "lucide-react";
import { bookFlight } from "@/app/actions/bookFlight";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await bookFlight(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
      setIsSubmitting(false);
      // Optional: Auto close after a few seconds
      setTimeout(() => {
        onClose();
        setTimeout(() => setIsSuccess(false), 500); // reset state after closing animation
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto scrollbar-hide"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5">
                <div className="flex items-center gap-3 text-white">
                  <PlaneTakeoff className="w-6 h-6 text-white/70" aria-hidden="true" />
                  <h3 id="modal-title" className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase">
                    Request a Flight
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 md:p-8 relative min-h-[350px] md:min-h-[400px]">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-white/90 mb-6" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-white mb-4 tracking-widest uppercase">
                        Request Received
                      </h4>
                      <p className="text-white/60 leading-relaxed max-w-md">
                        Our concierge team is reviewing your flight request. We will be in touch shortly to finalize your bespoke aviation experience.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {errorMsg && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">
                            Destination
                          </label>
                          <input
                            type="text"
                            name="destination"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                            placeholder="e.g. Monaco, Dubai, New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">
                            Travel Date
                          </label>
                          <input
                            type="date"
                            name="travelDate"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">
                          Special Requirements (Optional)
                        </label>
                        <textarea
                          name="requirements"
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                          placeholder="Dietary preferences, preferred aircraft, number of passengers..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden bg-white text-black rounded-xl py-4 font-bold tracking-[0.2em] uppercase text-sm disabled:opacity-70 transition-all"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing
                            </>
                          ) : (
                            "Submit Request"
                          )}
                        </span>
                        {!isSubmitting && (
                          <div className="absolute inset-0 bg-white/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
