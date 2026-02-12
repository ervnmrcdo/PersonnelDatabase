"use client";

import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Publication } from "@/lib/types";

// interface Publication {
//   id: string;
//   title?: string | null;
//   author_name?: string | null;
//   journalName?: string | null;
//   date?: string | null;
//   publisher?: string | null;
//   volumeNumber?: string | null;
//   pageNumber?: string | null;
//   issueNumber?: string | null;
// }


export default function Publications() {
  const { user } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationStatus, setPublicationStatus] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [pageNumbers, setPageNumbers] = useState('');
  const [journalPublication, setJournalPublication] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');
  const [totalAuthors, setTotalAuthors] = useState(1);

  useEffect(() => {
  const fetchPublications = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/publications?authorId=${user.id}`
      );

      const data = await res.json();

      const formatted = data.map((p: any) => ({
            id: p.publication_id,
            title: p.title,
            authors: p.authors ?? [], // <-- use the actual array
            journalName: p.journal_publication,
            date: p.date_published,
            publisher: p.publisher,
            volumeNumber: p.volume_number,
            pageNumber: p.page_number,
            issueNumber: p.issue_number,
          }));



      if (res.ok) {
        setPublications(formatted);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  fetchPublications();
}, [user]);

const addPublication = async () => {
    if (!title.trim() || !user) return;

    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, 
          authorId: user.id,
          type,
          publisher,
          publication_status: publicationStatus,
          date_published: datePublished,
          page_number: pageNumber,
          issue_number: issueNumber,
          page_numbers: pageNumbers,
          journal_publication: journalPublication,
          volume_number: volumeNumber,
          total_authors: totalAuthors })
      });

      if (res.ok) {
        const created = await res.json();
        setPublications((prev) => [...prev, created]);
        setTitle('');
        setShowForm(false);

        setType('');
        setPublisher('');
        setPublicationStatus('');
        setDatePublished('');
        setPageNumber('');
        setIssueNumber('');
        setPageNumbers('');
        setJournalPublication('');
        setVolumeNumber('');
        setTotalAuthors(1);
      }
    } catch (err) {
      console.error(err);
    }
};


  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700 mt-8">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white mb-4">My Publications</h2>
          <button onClick={() => setShowForm(!showForm)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            {showForm ? 'Cancel' : 'Add Publication'}
          </button>
          </div>

          { showForm && (
            <div className="mb-6 grid gap-2 grid-cols-1 md:grid-cols-2">
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" className="w-full p-2 rounded text-black" />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded text-black" />
            <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" className="w-full p-2 rounded text-black" />
            <input type="text" value={publicationStatus} onChange={(e) => setPublicationStatus(e.target.value)} placeholder="Publication Status" className="w-full p-2 rounded text-black" />
            <input type="date" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} placeholder="Date Published" className="w-full p-2 rounded text-black" />
            <input type="text" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} placeholder="Page Number" className="w-full p-2 rounded text-black" />
            <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="Issue Number" className="w-full p-2 rounded text-black" />
            <input type="text" value={pageNumbers} onChange={(e) => setPageNumbers(e.target.value)} placeholder="Page Numbers" className="w-full p-2 rounded text-black" />
            <input type="text" value={journalPublication} onChange={(e) => setJournalPublication(e.target.value)} placeholder="Journal Publication" className="w-full p-2 rounded text-black" />
            <input type="text" value={volumeNumber} onChange={(e) => setVolumeNumber(e.target.value)} placeholder="Volume Number" className="w-full p-2 rounded text-black" />
            <input type="number" value={totalAuthors} onChange={(e) => setTotalAuthors(Number(e.target.value))} placeholder="Total Authors" className="w-full p-2 rounded text-black" />
              <button
                onClick={addPublication}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
              >
                Save
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : publications.length === 0 ? (
            <p className="text-gray-400">No publications found.</p>
          ) : (
            <ul className="space-y-4">
              {publications.map((pub) => (
                <li
                  key={pub.id}
                  className="bg-[#23263a] p-4 rounded-lg border border-gray-600"
                >
                  <div className="font-bold text-lg text-white">{pub.title}</div>
                  <div className="text-gray-400 text-sm">
                    Author: {pub.authors?.map((a:any) => `${a.first_name ?? ''} ${a.last_name ?? ''}`).join(', ') ?? ''}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}