"use client";

import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SupabasePublication } from '@/lib/types';

export default function Publications() {
  const { user } = useAuth();
  const [publications, setPublications] = useState<SupabasePublication[]>([]);
  const [loading, setLoading] = useState(true);
  // const [showForm, setShowForm] = useState(false);
  // const [isEditing, setIsEditing] = useState(false)

  type Mode = "view" | "add" | "edit";
  const [mode, setMode] = useState<Mode>("view");

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationStatus, setPublicationStatus] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [pageNumbers, setPageNumbers] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');
  const [journalName, setJournalName] = useState('');
  
  const [selectedPublication, setSelectedPublication] = useState<SupabasePublication | null>(null);

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
            volume_number, 
            journal_name
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


  function resetForm() {
    setType('')
    setTitle('')
    setPublisher('')
    setPublicationStatus('')
    setDatePublished('')
    setIssueNumber('')
    setPageNumbers('')
    setVolumeNumber('')
    setJournalName('')
    setSelectedPublication(null)
  }

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
          journal_name: journalName,
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

    await fetchPublications();
    resetForm();
    setMode("view");
    setLoading(false);
  };

  async function editPublication() {
    if (!selectedPublication) return

    try {
      setLoading(true)

      const { error } = await supabase
        .from('publications')
        .update({
          type,
          title,
          publisher,
          publication_status: publicationStatus,
          date_published: datePublished,
          issue_number: issueNumber,
          page_numbers: pageNumbers,
          volume_number: volumeNumber,
          journal_name: journalName
        })
        .eq('publication_id', selectedPublication.publication_id)

      if (error) throw error

      await fetchPublications()
      resetForm()
      setMode("view")
      alert('Publication updated!')
    } catch (error) {
      console.error(error)
      alert('Error updating publication')
    } finally {
      setLoading(false)
    }
  } 

  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700 mt-8">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white mb-4">My Publications</h2>
          <button
            onClick={() => {
              resetForm()
              setMode("add");
            }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add Publication
            </button>
          </div>

          {(mode === "add" || mode === "edit") && (
            <div className="mb-6 grid gap-2 grid-cols-1 md:grid-cols-2">
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" className="w-full p-2 rounded text-black" />
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded text-black" />
              <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" className="w-full p-2 rounded text-black" />
              <input type="text" value={publicationStatus} onChange={(e) => setPublicationStatus(e.target.value)} placeholder="Publication Status" className="w-full p-2 rounded text-black" />
              <input type="date" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} placeholder="Date Published" className="w-full p-2 rounded text-black" />
              <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="Issue Number" className="w-full p-2 rounded text-black" />
              <input type="text" value={pageNumbers} onChange={(e) => setPageNumbers(e.target.value)} placeholder="Page Numbers" className="w-full p-2 rounded text-black" />
              <input type="text" value={volumeNumber} onChange={(e) => setVolumeNumber(e.target.value)} placeholder="Volume Number" className="w-full p-2 rounded text-black" />
              <input type="text" value={journalName} onChange={(e) => setJournalName(e.target.value)} placeholder="Journal Name" className="w-full p-2 rounded text-black" />
              <button
                onClick={mode === "edit" ? editPublication : addPublication}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
              >
                Save
              </button>
              <button
                  onClick={() => {
                    resetForm();
                    setMode("view");
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
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
                  onClick={() => {
                    setSelectedPublication(pub)
                    setMode("view");

                    setType(pub.type || '')
                    setTitle(pub.title || '')
                    setPublisher(pub.publisher || '')
                    setPublicationStatus(pub.publication_status || '')
                    setDatePublished(pub.date_published || '')
                    setIssueNumber(pub.issue_number || '')
                    setPageNumbers(pub.page_numbers || '')
                    setVolumeNumber(pub.volume_number || '')
                    setJournalName(pub.journal_name || '')
                  }}
                  className="bg-[#23263a] p-4 rounded-lg border border-gray-600 cursor-pointer hover:border-blue-500 transition"
                >
                  <div className="font-bold text-lg text-white">{pub.title}</div>
                  <div className="text-gray-400 text-sm">
                    Type: {pub.type}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Publisher: {pub.publisher}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {mode === "view" && selectedPublication && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#1b1e2b] p-6 rounded-lg w-full max-w-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                {selectedPublication.title}
              </h3>

            <div className="space-y-2 text-gray-300 text-sm">
            <p><span className="text-gray-400">Type:</span> {selectedPublication.type}</p>
            <p><span className="text-gray-400">Publisher:</span> {selectedPublication.publisher}</p>
            <p><span className="text-gray-400">Status:</span> {selectedPublication.publication_status}</p>
            <p><span className="text-gray-400">Date Published:</span> {selectedPublication.date_published}</p>
            <p><span className="text-gray-400">Issue:</span> {selectedPublication.issue_number}</p>
            <p><span className="text-gray-400">Pages:</span> {selectedPublication.page_numbers}</p>
            <p><span className="text-gray-400">Volume:</span> {selectedPublication.volume_number}</p>
            <p><span className="text-gray-400">Journal:</span> {selectedPublication.journal_name}</p>
          </div>
            <button
                    onClick={() => setMode("edit")}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                  >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedPublication(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}