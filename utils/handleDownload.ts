import { IPAFormData } from "@/lib/types";

export const handleDownload = async (data: IPAFormData) => {
  try {
    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const blob = await pdf.blob()
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

