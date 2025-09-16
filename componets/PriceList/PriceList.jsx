'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FaBuilding, FaFilePdf, FaDownload, FaCalendarAlt, FaEye, FaExternalLinkAlt } from 'react-icons/fa';

const PriceList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetch('/data/priceListData.json')
      .then((r) => r.json())
      .then((data) => setCompanies(data?.companies || []))
      .catch((e) => console.error('Error loading price list data:', e))
      .finally(() => setLoading(false));
  }, []);

  const safeName = (s) => (s || 'file').toString().replace(/[^\w\-]+/g, '_');

  // Improved PDF handling with multiple fallback options
  const handlePDFAction = async (pdfUrl, filename, action = 'view') => {
    try {
      if (action === 'view') {
        // Try to open PDF in new tab first
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (action === 'download') {
        // For download, try fetch first, then fallback to direct link
        try {
          const response = await fetch(pdfUrl, { 
            mode: 'no-cors',
            method: 'HEAD' 
          });
          
          // Create download link
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = filename || 'document.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch {
          // Fallback: open in new tab if download fails
          window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        }
      }
    } catch (error) {
      console.error('PDF action failed:', error);
      // Final fallback: just open the URL
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Check if URL is likely to work for direct viewing
  const isDirectViewable = (url) => {
    return url && (
      url.includes('.pdf') || 
      url.includes('drive.google.com') ||
      url.includes('dropbox.com') ||
      url.includes('onedrive.com')
    );
  };

  const visibleItems = useMemo(() => {
    if (activeTab === 'all') {
      return companies.flatMap((c) => (c.priceLists || []).map((p) => ({ ...p, _company: c })));
    }
    const c = companies.find((x) => String(x.id) === String(activeTab));
    return (c?.priceLists || []).map((p) => ({ ...p, _company: c }));
  }, [companies, activeTab]);

  const TabsSkeleton = () => (
    <div className="flex flex-wrap justify-center gap-3 mb-8 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 w-28 rounded-full bg-gray-200" />
      ))}
    </div>
  );

  const GridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 p-5 bg-white">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
          <div className="h-9 w-32 bg-gray-200 rounded mt-4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <>
          <TabsSkeleton />
          <GridSkeleton />
        </>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={[
                'group flex items-center px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur bg-white/70',
                activeTab === 'all'
                  ? 'border-transparent shadow-lg ring-2 text-[#8b2727] ring-[#8b2727]'
                  : 'border-gray-200 hover:border-[#8b2727] hover:shadow-md text-gray-700'
              ].join(' ')}
            >
              <span className="mr-2 grid place-items-center h-8 w-8 rounded-full bg-[#8b2727] text-white">
                <FaBuilding />
              </span>
              <span className="font-medium">All</span>
            </button>

            {companies.map((c) => {
              const active = String(activeTab) === String(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(String(c.id))}
                  className={[
                    'group flex items-center px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur bg-white/70',
                    active
                      ? 'border-transparent shadow-lg ring-2 text-[#8b2727] ring-[#8b2727]'
                      : 'border-gray-200 hover:border-[#8b2727] hover:shadow-md text-gray-700'
                  ].join(' ')}
                >
                  <span
                    className={[
                      'mr-2 grid place-items-center h-8 w-8 rounded-full',
                      active ? 'bg-[#8b2727] text-white' : 'bg-[#8b2727]/10 text-[#8b2727]'
                    ].join(' ')}
                  >
                    <FaBuilding />
                  </span>
                  <span className="font-medium">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleItems.map((pdf) => (
              <div
                key={`${pdf._company?.id}-${pdf.id}`}
                className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-white/80 backdrop-blur hover:shadow-md transition"
              >
                <div className="flex items-start">
                  <div className="text-[#8b2727] mt-1 mr-3">
                    <FaFilePdf size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#8b2727] mb-1">
                      {pdf._company?.name}
                    </p>
                    <h4 className="font-semibold text-gray-800 truncate">{pdf.title}</h4>
                    {pdf.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pdf.description}</p>
                    )}
                    {pdf.lastUpdated && (
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <FaCalendarAlt className="mr-1" />
                        <span>Last updated: {pdf.lastUpdated}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  {/* View Button */}
                  {/* <button
                    onClick={() => handlePDFAction(pdf.pdfUrl, `${safeName(pdf._company?.name)}-${safeName(pdf.title)}.pdf`, 'view')}
                    className="flex-1 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow inline-flex items-center justify-center gap-2 text-sm"
                    title="View PDF"
                  >
                    <FaEye /> View
                  </button> */}

                  {/* Download Button */}
                  <button
                    onClick={() => handlePDFAction(pdf.pdfUrl, `${safeName(pdf._company?.name)}-${safeName(pdf.title)}.pdf`, 'download')}
                    className="px-3 py-3 rounded-md bg-[#8b2727] hover:bg-[#7a2222] text-white shadow inline-flex items-center justify-center gap-2 text-sm"
                    title="Download PDF"
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No items message */}
          {visibleItems.length === 0 && (
            <div className="text-center py-12">
              <FaFilePdf className="mx-auto text-gray-300 text-6xl mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No Price Lists Found</h3>
              <p className="text-gray-400">No price lists available for the selected company.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PriceList;