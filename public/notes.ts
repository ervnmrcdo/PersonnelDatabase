
// useEffect(() => {
//   console.log('allo');
//
//   fetch('api/get/publications', {
//     method: "POST",
//     body: JSON.stringify(payload),
//   })
//     .then((res) => res.json())
//     .then((result: PublicationData[]) => { // Assuming result is an array
//       // Transform the API response to match your Publication interface
//       const transformedPublications: Publication[] = result.map((item: PublicationData) => ({
//         id: item.publication_id,
//         title: item.title,
//         date: item.publication_date,
//         journalName: item.journal_publication,
//         volumeNumber: item.volume_number,
//         pageNumber: item.pag_number,
//         publisher: item.publisher // Fixed typo
//       }));
//
//       // Update state with the transformed array
//       setPublications(transformedPublications);
//     })
//     .catch((error) => {
//       console.error('Error fetching publications:', error);
//     });
// }, []); // Make sure to include dependencies if needed

// const publications: Publication[] = []
// useEffect(() => {
//   console.log('allo')
//   fetch('api/get/publications', {
//     method: "POST",
//     body: JSON.stringify(payload),
//   }).then((res) => res.json())
//     .then((result) => {
//       publications.push(
//         result.map((item: any) => ({
//           id: item.publication_id,
//           title: item.title,
//           date: item.publication_date,
//           journalName: item.journal_publication,
//           volumeNumber: item.volume_number,
//           pageNumber: item.pag_number,
//           publishe: item.publisher
//         }))
//       )
//     })
// }, [])
//



