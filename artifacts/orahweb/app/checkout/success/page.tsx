'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const { data: session } = useSession();
  const [data, setData] = useState<{ domains?: string[]; customer_email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const called = useRef(false);

  useEffect(() => {
    if (!sessionId || called.current) return;
    called.current = true;

    const userId = session?.user
      ? parseInt((session.user as { id?: string }).id ?? '0') || null
      : null;

    fetch('/api/stripe/checkout/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, userId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not confirm your purchase. Your payment was received — check My Domains shortly.');
        setLoading(false);
      });
  }, [sessionId, session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${error ? 'bg-amber-100' : 'bg-emerald-100'}`}>
          {error ? (
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {error ? 'Payment Received' : 'Payment Successful!'}
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          {error
            ? 'Your payment went through. Your domains will appear in My Domains shortly.'
            : `Your domain${(data?.domains?.length ?? 0) > 1 ? 's are' : ' is'} now registered and owned by you forever.`}
        </p>

        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 flex items-center justify-center">
            <svg className="animate-spin w-6 h-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-gray-500 text-sm">Registering your domain…</span>
          </div>
        )}

        {!loading && data?.domains && data.domains.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Registered Domains</p>
            {data.domains.map((d) => (
              <div key={d} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold">
                    {d.split('.').pop()?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">{d}</span>
                <span className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Registered</span>
              </div>
            ))}
            {data.customer_email && (
              <p className="text-xs text-gray-400 pt-2">Confirmation sent to {data.customer_email}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            View My Domains
          </Link>
          <Link
            href="/domains"
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Search More Domains
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
