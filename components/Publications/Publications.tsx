"use client";

import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SupabasePublication } from '@/lib/types';

export default function Publications() {
  const { user } = useAuth();
  const [publications, setPublications] = useState<SupabasePublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationStatus, setPublicationStatus] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [pageNumbers, setPageNumbers] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchPublications();
  }, [user]);

  const fetchPublications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('publication_authors')
        .select(`
          publication_id,
          publications (
            publication_id,
            type,
            title,
            publisher,
            publication_status,
            date_published,
            issue_number,
            page_numbers,
            volume_number
          )
        `)
        .eq('user_id', user.id);

      if (!error && data) {
        const pubs = data
          .map((row: any) => row.publications)
          .filter((pub: any) => !!pub);
        setPublications(pubs);
      }

      setLoading(false);
    };

  const addPublication = async () => {
    if (!title.trim() || !user) return;

    setLoading(true);
    const { data: pubData, error: pubError } = await supabase
      .from('publications')
      .insert([
        {
          type,
          title,
          publisher,
          publication_status: publicationStatus,
          date_published: datePublished,
          issue_number: issueNumber,
          page_numbers: pageNumbers,
          volume_number: volumeNumber,
        }
      ])
      .select();

    if (pubError || !pubData || pubData.length === 0) {
      setLoading(false);
      alert('Failed to add publication.');
      return;
    }

    const newPub = pubData[0];

    // link publication to current user adding
    const { error: linkError } = await supabase
      .from('publication_authors')
      .insert([
        {
          publication_id: newPub.publication_id,
          user_id: user.id,
        }
      ]);

    if (linkError) {
      setLoading(false);
      alert('Failed to link publication to user.');
      return;
    }

    setType('');
    setTitle('');
    setPublisher('');
    setPublicationStatus('');
    setDatePublished('');
    setIssueNumber('');
    setPageNumbers('');
    setVolumeNumber('');
    setShowForm(false);

    await fetchPublications();
    setLoading(false);
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

          {showForm && (
            <div className="mb-6 grid gap-2 grid-cols-1 md:grid-cols-2">
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" className="w-full p-2 rounded text-black" />
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded text-black" />
              <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" className="w-full p-2 rounded text-black" />
              <input type="text" value={publicationStatus} onChange={(e) => setPublicationStatus(e.target.value)} placeholder="Publication Status" className="w-full p-2 rounded text-black" />
              <input type="date" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} placeholder="Date Published" className="w-full p-2 rounded text-black" />
              <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="Issue Number" className="w-full p-2 rounded text-black" />
              <input type="text" value={pageNumbers} onChange={(e) => setPageNumbers(e.target.value)} placeholder="Page Numbers" className="w-full p-2 rounded text-black" />
              <input type="text" value={volumeNumber} onChange={(e) => setVolumeNumber(e.target.value)} placeholder="Volume Number" className="w-full p-2 rounded text-black" />
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
                  key={pub.publication_id}
                  className="bg-[#23263a] p-4 rounded-lg border border-gray-600"
                >
                  <div className="font-bold text-lg text-white">{pub.title}</div>
                  <div className="text-gray-400 text-sm">
                    Type: {pub.type}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Publisher: {pub.publisher}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Date Published: {pub.date_published}
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