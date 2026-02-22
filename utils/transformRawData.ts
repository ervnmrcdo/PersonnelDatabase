import { initialIPAFormData } from "@/lib/classes"
import { IPAFormData, RawData } from "@/lib/types"

export function transformToIPAFormData(rawData: RawData): IPAFormData {
  const result = new initialIPAFormData({
    articleTitle: rawData.selectedPublication.title,
    completeCitation: `${rawData.selectedPublication.title}, ${rawData.selectedPublication.journal_name}, ${rawData.selectedPublication.volume_number}, ${rawData.selectedPublication.page_numbers}`,
    author1NameLastFirst: `${rawData.authors[0].last_name}, ${rawData.authors[0].first_name}, ${rawData.authors[0].middle_name}`,
    author1UniversityAndDept: `${rawData.authors[0].university}/${rawData.authors[0].department}`,
    totalAuthorNumber: rawData.authors.length.toString(),
    journalName: rawData.selectedPublication.journal_name,
    dateOfPublication: rawData.selectedPublication.date_published,
    publisherName: rawData.selectedPublication.publisher,
    author1Name: `${rawData.authors[0].first_name} ${rawData.authors[0].middle_name}, ${rawData.authors[0].last_name}`,
    author1University: rawData.authors[0].university,
    author1College: rawData.authors[0].college,
    author1Department: rawData.authors[0].department,
    author1Contact: rawData.authors[0].contact_number,
    author1Position: rawData.authors[0].position,
    author1EmailAddress: rawData.authors[0].email_address,
  })
  return result
}

export const handleDownload = async (data: any, shouldSubmit: boolean) => {
  try {
    const response = await fetch("/api/generate-ipc-award/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (shouldSubmit) {
      if (response.ok) {
        alert('Form successfully Submitted.')
      } else {
        alert('Failed to submit application.')
      }
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ipc-award-form.pdf";
    a.click();

  } catch (err) {
    alert('Submission Failed');
    console.log(`Internal Server Error: ${err}`)
  }
};

