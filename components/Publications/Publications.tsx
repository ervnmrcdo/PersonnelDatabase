"use client";

import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Publication {
  id: string
  title?: string | null
  author_name?: string | null
}

export default function Publications() {
  const { user } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPublications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('publications')
        .select('id, title, author_name')
        .eq('author_id', user.id);

      if (!error && data) {
        setPublications(data);
      }

      setLoading(false);
    };

    fetchPublications();
  }, [user]);

  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">My Publications</h2>

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
                    Author: {pub.author_name}
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