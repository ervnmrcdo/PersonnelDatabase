import { initialIPAFormData } from "@/lib/classes"
import { IPAFormData, RawData } from "@/lib/types"

export function transformToIPAFormData(rawData: RawData): IPAFormData {
  const result = new initialIPAFormData({
    articleTitle: rawData.selectedPublication.title,
    completeCitation: `${rawData.selectedPublication.title}, ${rawData.selectedPublication.journalName}, ${rawData.selectedPublication.volumeNumber}, ${rawData.selectedPublication.pageNumber}`,
    author1NameLastFirst: `${rawData.authors[0].lastName}, ${rawData.authors[0].firstName}, ${rawData.authors[0].middleName}`,
    author1UniversityAndDept: `${rawData.authors[0].university}/${rawData.authors[0].department}`,
    totalAuthorNumber: rawData.authors.length.toString(),
    journalName: rawData.selectedPublication.journalName,
    dateOfPublication: rawData.selectedPublication.date,
    publisherName: rawData.selectedPublication.publisher,
    author1Name: `${rawData.authors[0].firstName} ${rawData.authors[0].middleName}, ${rawData.authors[0].lastName}`,
    author1University: rawData.authors[0].university,
    author1College: rawData.authors[0].college,
    author1Department: rawData.authors[0].department,
    author1Contact: rawData.authors[0].contactNo,
    author1Position: rawData.authors[0].position,
    author1EmailAddress: rawData.authors[0].emailAddress,
  })
  return result
}


