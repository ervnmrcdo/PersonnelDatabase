import { useState } from "react";

interface AcceptedAward {
    submission_id: string;
    pdfBytes: 'string';
}

//hard-coded id of sudent need to be changed
let id = 1

export default async function SubmissionsPage() {
    const [step, setStep] = useState<'listing' | 'accepted-review'>('listing')
    const [acceptedAward, setAcceptedAward] = useState<AcceptedAward | null>(null)

    const data = await fetch('', {
        body:
    })


    return (<div>
        <h2>Accepted</h2>

    </div>);
}
