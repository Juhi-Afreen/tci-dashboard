import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';
import BorderStatCard from '../components/BorderStatCard';

// ── Glossary data ─────────────────────────────────────────────────────────────

interface GlossaryEntry {
    term: string;
    definition: string;
}

const glossaryData: { letter: string; entries: GlossaryEntry[] }[] = [
    {
        letter: 'A',
        entries: [
            { term: 'Acquittal', definition: 'A jury verdict that a criminal defendant is not guilty, or the finding of a judge that the evidence is insufficient to support a conviction.' },
            { term: 'Active judge', definition: 'A judge in the full-time service of the court. Compare to senior judge.' },
            { term: 'Admissible', definition: 'A term used to describe evidence that may be considered by a jury or judge in civil and criminal cases.' },
            { term: 'Affidavit', definition: 'A written or printed statement made under oath.' },
            { term: 'Affirmed', definition: 'In the practice of the court of appeals, it means that the court of appeals has concluded that the lower court decision is correct and will stand as rendered by the lower court.' },
            { term: 'Alternate juror', definition: 'A juror selected in the same manner as a regular juror who hears all the evidence but does not help decide the case unless called on to replace a regular juror.' },
            { term: 'Alternative dispute resolution (ADR)', definition: 'A procedure for settling a dispute outside the courtroom. Most forms of ADR are not binding, and involve referral of the case to a neutral party such as an arbitrator or mediator.' },
            { term: 'Amicus curiae', definition: 'Latin for "friend of the court." It is advice formally offered to the court in a brief filed by an entity interested in, but not a party to, the case.' },
            { term: 'Answer', definition: 'The formal written statement by a defendant in a civil case that responds to a complaint, articulating the grounds for defense.' },
            { term: 'Appeal', definition: 'A request made after a trial by a party that has lost on one or more issues that a higher court review the decision to determine if it was correct.' },
            { term: 'Appellant', definition: 'The party who appeals a district court\'s decision, usually seeking reversal of that decision.' },
            { term: 'Appellate', definition: 'About appeals; an appellate court has the power to review the judgment of a lower court (trial court) or tribunal.' },
            { term: 'Appellee', definition: 'The party who opposes an appellant\'s appeal, and who seeks to persuade the appeals court to affirm the district court\'s decision.' },
            { term: 'Arraignment', definition: 'A proceeding in which a criminal defendant is brought into court, told of the charges in an indictment or information, and asked to plead guilty or not guilty.' },
            { term: 'Article III judge', definition: 'A federal judge who is appointed for life, during "good behavior," under Article III of the Constitution. Article III judges are nominated by the President and confirmed by the Senate.' },
            { term: 'Assets', definition: 'Property of all kinds, including real and personal, tangible and intangible.' },
            { term: 'Automatic stay', definition: 'An injunction that automatically stops lawsuits, foreclosures, garnishments, and most collection activities against the debtor the moment a bankruptcy petition is filed.' },
        ],
    },
    {
        letter: 'B',
        entries: [
            { term: 'Bail', definition: 'The release, prior to trial, of a person accused of a crime, under specified conditions designed to assure that person\'s appearance in court when required.' },
            { term: 'Bankruptcy', definition: 'A legal procedure for dealing with debt problems of individuals and businesses; specifically, a case filed under one of the chapters of title 11 of the United States Code.' },
            { term: 'Bankruptcy code', definition: 'The informal name for title 11 of the United States Code (11 U.S.C. §§ 101–1330), the federal bankruptcy law.' },
            { term: 'Bankruptcy court', definition: 'The bankruptcy judges in regular active service in each district; a unit of the district court.' },
            { term: 'Bankruptcy estate', definition: 'All interests of the debtor in property at the time of the bankruptcy filing. The estate technically becomes the temporary legal owner of all of the debtor\'s property.' },
            { term: 'Bench trial', definition: 'A trial without a jury, in which the judge serves as the fact-finder.' },
            { term: 'Brief', definition: 'A written statement submitted in a trial or appellate proceeding that explains one side\'s legal and factual arguments.' },
            { term: 'Burden of proof', definition: 'The duty to prove disputed facts. In civil cases, a plaintiff generally has the burden of proving his or her case. In criminal cases, the government has the burden of proving the defendant\'s guilt.' },
        ],
    },
    {
        letter: 'C',
        entries: [
            { term: 'Capital offense', definition: 'A crime punishable by death.' },
            { term: 'Case file', definition: 'A complete collection of every document filed in court in a case.' },
            { term: 'Case law', definition: 'The law as established in previous court decisions. A synonym for legal precedent.' },
            { term: 'Cause of action', definition: 'A legal claim.' },
            { term: 'Chapter 7', definition: 'The chapter of the Bankruptcy Code providing for "liquidation," that is, the sale of a debtor\'s nonexempt property and the distribution of the proceeds to creditors.' },
            { term: 'Chapter 11', definition: 'A reorganization bankruptcy, usually involving a corporation or partnership. A Chapter 11 debtor usually proposes a plan of reorganization to keep its business alive and pay creditors over time.' },
            { term: 'Chapter 13', definition: 'The chapter of the Bankruptcy Code providing for the adjustment of debts of an individual with regular income, often referred to as a "wage-earner" plan.' },
            { term: 'Claim', definition: 'A creditor\'s assertion of a right to payment from a debtor or the debtor\'s property.' },
            { term: 'Class action', definition: 'A lawsuit in which one or more members of a large group, or class, of individuals or other entities sue on behalf of the entire class.' },
            { term: 'Clerk of court', definition: 'The court officer who oversees administrative functions, especially managing the flow of cases through the court.' },
            { term: 'Complaint', definition: 'A written statement that begins a civil lawsuit, in which the plaintiff details the claims against the defendant.' },
            { term: 'Concurrent sentence', definition: 'Prison terms for two or more offenses to be served at the same time, rather than one after the other.' },
            { term: 'Consecutive sentence', definition: 'Prison terms for two or more offenses to be served one after the other.' },
            { term: 'Conviction', definition: 'A judgment of guilt against a criminal defendant.' },
            { term: 'Counsel', definition: 'Legal advice; a term also used to refer to the lawyers in a case.' },
            { term: 'Count', definition: 'An allegation in an indictment or information, charging a defendant with a crime.' },
            { term: 'Court reporter', definition: 'A person who makes a word-for-word record of what is said in court, generally by using a stenographic machine, shorthand, or audio recording, and then produces a transcript of the proceedings upon request.' },
        ],
    },
    {
        letter: 'D',
        entries: [
            { term: 'Damages', definition: 'Money that a defendant pays a plaintiff in a civil case if the plaintiff has won. Damages may be compensatory (for loss or injury) or punitive (to punish and deter future misconduct).' },
            { term: 'De facto', definition: 'Latin, meaning "in fact" or "actually." Something that exists in fact but not as a matter of law.' },
            { term: 'De jure', definition: 'Latin, meaning "in law." Something that exists by operation of law.' },
            { term: 'De novo', definition: 'Latin, meaning "anew." A trial de novo is a completely new trial. Appellate review de novo implies no deference to the trial judge\'s ruling.' },
            { term: 'Debtor', definition: 'A person who has filed a petition for relief under the Bankruptcy Code.' },
            { term: 'Default judgment', definition: 'A judgment awarding a plaintiff the relief sought in the complaint because the defendant has failed to appear in court or otherwise respond to the complaint.' },
            { term: 'Defendant', definition: 'In a civil case, the person or organization against whom the plaintiff brings suit; in a criminal case, the person accused of the crime.' },
            { term: 'Deposition', definition: 'An oral statement made before an officer authorized by law to administer oaths. Such statements are often taken to examine potential witnesses, to obtain discovery, or to be used later in trial.' },
            { term: 'Discharge', definition: 'A release of a debtor from personal liability for certain dischargeable debts. Notable exceptions to dischargeability are taxes and student loans.' },
            { term: 'Discovery', definition: 'Procedures used to obtain disclosure of evidence before trial.' },
            { term: 'Dismissal with prejudice', definition: 'Court action that prevents an identical lawsuit from being filed later.' },
            { term: 'Docket', definition: 'A log containing the complete history of each case in the form of brief chronological entries summarizing the court proceedings.' },
            { term: 'Due process', definition: 'In criminal law, the constitutional guarantee that a defendant will receive a fair and impartial trial. In civil law, the legal rights of someone who confronts an adverse action threatening liberty or property.' },
        ],
    },
    {
        letter: 'E',
        entries: [
            { term: 'En banc', definition: 'French, meaning "on the bench." All judges of an appellate court sitting together to hear a case, as opposed to the routine disposition by panels of three judges.' },
            { term: 'Evidence', definition: 'Information presented in testimony or in documents that is used to persuade the fact finder (judge or jury) to decide the case in favor of one side or the other.' },
            { term: 'Ex parte', definition: 'A proceeding brought before a court by one party only, without notice to or challenge by the other side.' },
            { term: 'Exclusionary rule', definition: 'Doctrine that says evidence obtained in violation of a criminal defendant\'s constitutional or statutory rights is not admissible at trial.' },
            { term: 'Exculpatory evidence', definition: 'Evidence indicating that a defendant did not commit the crime.' },
        ],
    },
    {
        letter: 'F',
        entries: [
            { term: 'Felony', definition: 'A serious crime, usually punishable by at least one year in prison.' },
            { term: 'File', definition: 'To place a paper in the official custody of the clerk of court to enter into the files or records of a case.' },
            { term: 'Fraudulent transfer', definition: 'A transfer of a debtor\'s property made with intent to defraud or for which the debtor receives less than the transferred property\'s value.' },
        ],
    },
    {
        letter: 'G',
        entries: [
            { term: 'Grand jury', definition: 'A body of 16–23 citizens who listen to evidence of criminal allegations, which is presented by the prosecutors, and determine whether there is probable cause to believe an individual committed an offense.' },
        ],
    },
    {
        letter: 'H',
        entries: [
            { term: 'Habeas corpus', definition: 'Latin, meaning "you have the body." A writ of habeas corpus generally is a judicial order forcing law enforcement authorities to produce a prisoner they are holding, and to justify the prisoner\'s continued confinement.' },
            { term: 'Hearsay', definition: 'Evidence presented by a witness who did not see or hear the incident in question but heard about it from someone else. With some exceptions, hearsay generally is not admissible as evidence at trial.' },
        ],
    },
    {
        letter: 'I',
        entries: [
            { term: 'Impeachment', definition: 'The process of calling a witness\'s testimony into doubt, or the constitutional process whereby the House of Representatives may "impeach" (accuse of misconduct) high officers of the federal government.' },
            { term: 'In camera', definition: 'Latin, meaning in a judge\'s chambers. Often means outside the presence of a jury and the public. In private.' },
            { term: 'Indictment', definition: 'The formal charge issued by a grand jury stating that there is enough evidence that the defendant committed the crime to justify having a trial; it is used primarily for felonies.' },
            { term: 'Information', definition: 'A formal accusation by a government attorney that the defendant committed a misdemeanor.' },
            { term: 'Injunction', definition: 'A court order preventing one or more named parties from taking some action.' },
            { term: 'Interrogatories', definition: 'A form of discovery consisting of written questions to be answered in writing and under oath.' },
        ],
    },
    {
        letter: 'J',
        entries: [
            { term: 'Judge', definition: 'An official of the Judicial branch with authority to decide lawsuits brought before courts.' },
            { term: 'Judgment', definition: 'The official decision of a court finally resolving the dispute between the parties to the lawsuit.' },
            { term: 'Jurisdiction', definition: 'The legal authority of a court to hear and decide a certain type of case.' },
            { term: 'Jurisprudence', definition: 'The study of law and the structure of the legal system.' },
            { term: 'Jury', definition: 'The group of persons selected to hear the evidence in a trial and render a verdict on matters of fact.' },
            { term: 'Jury instructions', definition: 'A judge\'s directions to the jury before it begins deliberations regarding the factual questions it must answer and the legal rules that it must apply.' },
        ],
    },
    {
        letter: 'L',
        entries: [
            { term: 'Lawsuit', definition: 'A legal action started by a plaintiff against a defendant based on a complaint that the defendant failed to perform a legal duty which resulted in harm to the plaintiff.' },
            { term: 'Lien', definition: 'A charge on specific property that is designed to secure payment of a debt or performance of an obligation.' },
            { term: 'Litigation', definition: 'A case, controversy, or lawsuit. Participants (plaintiffs and defendants) in lawsuits are called litigants.' },
        ],
    },
    {
        letter: 'M',
        entries: [
            { term: 'Magistrate judge', definition: 'A judicial officer of a district court who conducts initial proceedings in criminal cases, decides criminal misdemeanor cases, conducts many pretrial civil and criminal matters on behalf of district judges.' },
            { term: 'Misdemeanor', definition: 'An offense punishable by one year of imprisonment or less. See also felony.' },
            { term: 'Mistrial', definition: 'An invalid trial, caused by fundamental error. When a mistrial is declared, the trial must start again with the selection of a new jury.' },
            { term: 'Motion', definition: 'A request by a litigant to a judge for a decision on an issue relating to the case.' },
        ],
    },
    {
        letter: 'N',
        entries: [
            { term: 'Nolo contendere', definition: 'No contest. A plea of nolo contendere has the same effect as a plea of guilty, as far as the criminal sentence is concerned, but may not be considered as an admission of guilt for any other purpose.' },
            { term: 'Nondischargeable debt', definition: 'A debt that cannot be eliminated in bankruptcy. Examples include a home mortgage, debts for alimony or child support, certain taxes, and debts for most government funded or guaranteed educational loans.' },
        ],
    },
    {
        letter: 'O',
        entries: [
            { term: 'Opinion', definition: 'A judge\'s written explanation of the decision of the court. Because a case may be heard by three or more judges in the court of appeals, the opinion in appellate decisions can take several forms.' },
            { term: 'Oral argument', definition: 'An opportunity for lawyers to summarize their position before the court and also to answer the judges\' questions.' },
        ],
    },
    {
        letter: 'P',
        entries: [
            { term: 'Panel', definition: 'In appellate cases, a group of judges (usually three) assigned to decide the case; in the jury selection process, the group of potential jurors.' },
            { term: 'Parole', definition: 'The release of a prison inmate after the inmate has completed part of his or her sentence in a federal prison.' },
            { term: 'Petit jury (or trial jury)', definition: 'A group of citizens who hear the evidence presented by both sides at trial and determine the facts in dispute. Federal criminal juries consist of 12 persons.' },
            { term: 'Plaintiff', definition: 'A person or business that files a formal complaint with the court.' },
            { term: 'Plea', definition: 'In a criminal case, the defendant\'s statement pleading "guilty" or "not guilty" in answer to the charges. See also nolo contendere.' },
            { term: 'Pleadings', definition: 'Written statements filed with the court that describe a party\'s legal or factual assertions about the case.' },
            { term: 'Precedent', definition: 'A court decision in an earlier case with facts and legal issues similar to a dispute currently before a court. Judges will generally "follow precedent."' },
            { term: 'Pro se', definition: 'Representing oneself. Serving as one\'s own lawyer.' },
            { term: 'Probation', definition: 'Sentencing option in the federal courts. With probation, instead of sending an individual to prison, the court releases the person to the community and orders him or her to complete a period of supervision.' },
        ],
    },
    {
        letter: 'R',
        entries: [
            { term: 'Reaffirmation agreement', definition: 'An agreement by a debtor to continue paying a dischargeable debt after the bankruptcy, usually for the purpose of keeping collateral or mortgaged property that would otherwise be subject to repossession.' },
            { term: 'Record', definition: 'A written account of the proceedings in a case, including all pleadings, evidence, and exhibits submitted in the course of the case.' },
            { term: 'Remand', definition: 'Send back.' },
        ],
    },
    {
        letter: 'S',
        entries: [
            { term: 'Sanction', definition: 'A penalty or other type of enforcement used to bring about compliance with the law or with rules and regulations.' },
            { term: 'Sentence', definition: 'The punishment ordered by a court for a defendant convicted of a crime.' },
            { term: 'Sequester', definition: 'To separate. Sometimes juries are sequestered from outside influences during their deliberations.' },
            { term: 'Settlement', definition: 'Parties to a lawsuit resolve their dispute without having a trial. Settlements often involve the payment of compensation by one party in at least partial satisfaction of the other party\'s claims.' },
            { term: 'Statute', definition: 'A law passed by a legislature.' },
            { term: 'Statute of limitations', definition: 'The time within which a lawsuit must be filed or a criminal prosecution begun. The deadline can vary, depending on the type of civil case or the crime charged.' },
            { term: 'Subpoena', definition: 'A command, issued under a court\'s authority, to a witness to appear and give testimony.' },
            { term: 'Subpoena duces tecum', definition: 'A command to a witness to appear and produce documents.' },
        ],
    },
    {
        letter: 'T',
        entries: [
            { term: 'Testimony', definition: 'Evidence presented orally by witnesses during trials or before grand juries.' },
            { term: 'Tort', definition: 'A civil, not criminal, wrong. A negligent or intentional injury against a person or property, with the exception of breach of contract.' },
            { term: 'Transcript', definition: 'A written, word-for-word record of what was said, either in a proceeding such as a trial, or during some other formal conversation, such as a hearing or oral deposition.' },
            { term: 'Trustee', definition: 'The representative of the bankruptcy estate who exercises statutory powers, principally for the benefit of the unsecured creditors, under the general supervision of the court.' },
        ],
    },
    {
        letter: 'V',
        entries: [
            { term: 'Venue', definition: 'The geographic area in which a court has jurisdiction. A change of venue is a change or transfer of a case from one judicial district to another.' },
            { term: 'Verdict', definition: 'The decision of a trial jury or a judge that determines the guilt or innocence of a criminal defendant, or that determines the final outcome of a civil case.' },
            { term: 'Voir dire', definition: 'Jury selection process of questioning prospective jurors, to ascertain their qualifications and determine any basis for challenge.' },
        ],
    },
    {
        letter: 'W',
        entries: [
            { term: 'Warrant', definition: 'Court authorization, most often for law enforcement officers, to conduct a search or make an arrest.' },
            { term: 'Witness', definition: 'A person called upon by either side in a lawsuit to give testimony before the court or jury.' },
            { term: 'Writ', definition: 'A written court order directing a person to take, or refrain from taking, a certain act.' },
            { term: 'Writ of certiorari', definition: 'An order issued by the U.S. Supreme Court directing the lower court to transmit records for a case which it will hear on appeal.' },
        ],
    },
];

// ── Court Format Template data ────────────────────────────────────────────────

const courtFormatRules = [
    {
        icon: 'person',
        color: '#3B82F6',
        bg: '#EFF6FF',
        title: 'Speaker Labels',
        desc: 'Identify each speaker using their role or name followed by a colon. Use consistent labels throughout the transcript.',
        example: 'INTERVIEWER:\nINTERVIEWEE:\nJUDGE:\nATTORNEY:',
    },
    {
        icon: 'space_bar',
        color: '#7C6FCD',
        bg: '#EEF0FF',
        title: 'Paragraph & Line Breaks',
        desc: 'Each new speaker starts on a new line. Leave one blank line between speaker turns to clearly delineate dialogue.',
        example: 'INTERVIEWER:\nYou can either be a witness, or\nyou can be the suspect.\n\nINTERVIEWEE:\nMan, I ain\'t did nothing, man.',
    },
    {
        icon: 'hearing',
        color: '#F59E0B',
        bg: '#FEF3C7',
        title: 'Inaudible / Indiscernible',
        desc: 'When audio is unclear or inaudible, use bracketed notation to indicate the issue at the exact point in the transcript.',
        example: 'We got a [indiscernible] help me,\nso you just here and think about\nwhat you got going on.',
    },
    {
        icon: 'notes',
        color: 'var(--green)',
        bg: 'var(--green-light)',
        title: 'Verbatim Accuracy',
        desc: 'Capture speech exactly as spoken — including false starts, filler words, and non-standard grammar — to preserve legal accuracy.',
        example: 'Man, I don\'t know nothing, man.\nI was at my girl\'s house, man.\n[Retains "don\'t know nothing" verbatim]',
    },
    {
        icon: 'format_quote',
        color: 'var(--rose)',
        bg: '#FFF1F4',
        title: 'Punctuation in Dialogue',
        desc: 'Use standard sentence punctuation within each speaker\'s turn. End sentences with periods; questions with question marks.',
        example: 'INTERVIEWER:\nHow you doing? Can you wake up?\nSit up for me.\n\nINTERVIEWEE:\nY\'all gotta let me go, man.',
    },
    {
        icon: 'edit_note',
        color: '#7C6FCD',
        bg: '#EEF0FF',
        title: 'Page Numbering',
        desc: 'Court transcripts are paginated. Pages are numbered sequentially and the format often includes a header or footer on each page.',
        example: 'PAGE 1\n──────────────────\n[Transcript content]\n\nPAGE 2\n──────────────────',
    },
];

const sampleTranscript = `INTERVIEWER:
Yeah, this has got to be picked up right here. He looks a little nervous in there waiting for the interrogation. You can tell by the way he's rubbing his head and stuff. There's something on his mind. I'm gonna go in there and see if I can't work it out, get something out of him. He's nervous man. He's real nervous. You can tell. How you doing? Can you wake up? Sit up for me. Sit up for me.

INTERVIEWEE:
Man, y'all gotta let me go, man.

INTERVIEWER:
Eh, we just wanna ask you a few questions about what went down the other night.

INTERVIEWEE:
Man, I don't know nothing, man. I was at my girl's house, man.

INTERVIEWER:
You go by Fat Cat, right, name on the street?

INTERVIEWEE:
Yeah.

INTERVIEWER:
Now, you know what office you're in, right?

INTERVIEWEE:
Yeah, I mean, I don't know. They just told me to come down.

INTERVIEWER:
It's Homicide, so we ain't worried about that little nickel and dime marijuana you're selling. You know, we know you sell it.

INTERVIEWEE:
Man, homicide.

INTERVIEWER:
We know you sell it.

INTERVIEWEE:
Man, I ain't did nothing, man. I don't know nothing.

INTERVIEWER:
We got a [indiscernible] help me, so you just here and think about what you got going on and make the decision you want to make, and I'll come back in and speak with you in a minute. Is that all right?

INTERVIEWEE:
Whatever, man.

INTERVIEWER:
Whatever? Eh, you can either be a witness, or you can be the suspect. I'll be right back.

INTERVIEWEE:
Man, I ain't did nothing, man.

INTERVIEWER:
Fat Cat, wake up man, wake up. All right, I got a couple questions I wanna ask you. We got some people saying you were somewhere where an incident occurred last night outside a club over on Arkansas side. Why don't you tell me about your day on Saturday, yesterday? Start around 6:00, what did you do?

INTERVIEWEE:
Man. I went to the store, man. Me and my girl, we went to the store. I just chilled out with her, watching movies with her.

INTERVIEWER:
What's your girl's name?

INTERVIEWEE:
Linda.

INTERVIEWER:
Linda? She got a last name?

INTERVIEWEE:
William.

INTERVIEWER:
Linda William?

INTERVIEWEE:
Yeah.

INTERVIEWER:
All right, so you all just went to the store and you pretty much chilled out after that?

INTERVIEWEE:
Yeah, I didn't go nowhere man. I just chilled out with her, man, we fell asleep together, man, watching a movie or whatever.

INTERVIEWER:
So, it's just you and Linda at home all night?

INTERVIEWEE:
Yeah, you can call her, man. You can call her.`;

// ── Component ─────────────────────────────────────────────────────────────────

const LegalTranscriptionTipsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'glossary' | 'courtformat'>('glossary');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState<string | null>(null);

    const allLetters = glossaryData.map(g => g.letter);

    const filteredGlossary = glossaryData
        .filter(group => activeLetter === null || group.letter === activeLetter)
        .map(group => ({
            ...group,
            entries: group.entries.filter(
                e =>
                    e.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.definition.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter(group => group.entries.length > 0);

    const totalTerms = glossaryData.reduce((sum, g) => sum + g.entries.length, 0);

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '28px 32px 40px' }}>
                <main className="w-full max-w-[1440px] mx-auto space-y-10">

                    {/* Header */}
                    <section>
                        <PageBreadcrumb pageName="Legal Transcription Tips" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Legal Transcription Tips</h2>
                        <div className="mt-4 flex items-start gap-3 rounded-xl px-5 py-4" style={{ background: 'var(--green-light)', border: '1.5px solid #a7d7c8' }}>
                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>gavel</span>
                            <p className="text-sm leading-relaxed" style={{ color: '#1a5c47' }}>
                                Master legal transcription with our comprehensive glossary of legal terms and court format template.&nbsp;
                                <a href="#" className="font-extrabold uppercase tracking-wide underline underline-offset-2" style={{ color: 'var(--green)', textDecorationColor: 'var(--green)' }}>Download Resources.</a>
                            </p>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BorderStatCard label="Legal Terms" value={String(totalTerms)} icon="menu_book" borderColor="var(--green)" iconColor="var(--green)" />
                        <BorderStatCard label="Letters Covered" value="18" icon="sort_by_alpha" borderColor="var(--blue)" iconColor="var(--blue)" />
                        <BorderStatCard label="Format Rules" value="6" icon="description" borderColor="var(--purple)" iconColor="var(--purple)" />
                        <BorderStatCard label="Sample Transcript" value="1" icon="article" borderColor="var(--orange)" iconColor="var(--orange)" />
                    </section>

                    {/* ── Tabs ── */}
                    <div style={{ display: 'flex', gap: '4px', background: '#F4F7F6', borderRadius: '10px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
                        {([
                            { id: 'glossary', label: 'Glossary of Legal Terms', icon: 'menu_book' },
                            { id: 'courtformat', label: 'Court Format Template', icon: 'description' },
                        ] as const).map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '7px',
                                    padding: '9px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    fontSize: '13.5px',
                                    fontWeight: 600,
                                    transition: 'all .15s',
                                    background: activeTab === tab.id ? '#fff' : 'transparent',
                                    color: activeTab === tab.id ? 'var(--green)' : 'var(--text-secondary)',
                                    boxShadow: activeTab === tab.id ? '0 1px 6px rgba(0,0,0,.08)' : 'none',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* ══════════════════ GLOSSARY TAB ══════════════════ */}
                    {activeTab === 'glossary' && (
                        <div>
                            {/* Search + filter bar */}
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '24px' }}>
                                {/* Search */}
                                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                                    <span className="material-symbols-outlined" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: 'var(--text-muted)', pointerEvents: 'none' }}>search</span>
                                    <input
                                        type="text"
                                        placeholder="Search legal terms…"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%', padding: '10px 14px 10px 40px',
                                            border: '1.5px solid var(--border)', borderRadius: '10px',
                                            fontFamily: 'inherit', fontSize: '13.5px',
                                            background: '#fff', color: 'var(--text-primary)',
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'border-color .2s',
                                        }}
                                        onFocus={e => (e.target.style.borderColor = 'var(--green)')}
                                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                                    />
                                </div>

                                {/* Stats badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'var(--green-light)', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--green)', whiteSpace: 'nowrap' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>auto_stories</span>
                                    {totalTerms} terms across 18 letters
                                </div>
                            </div>

                            {/* Alphabet filter */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                                <button
                                    onClick={() => setActiveLetter(null)}
                                    style={{
                                        padding: '5px 12px', borderRadius: '7px', border: '1.5px solid',
                                        fontFamily: 'inherit', fontSize: '12px', fontWeight: 700,
                                        cursor: 'pointer', transition: 'all .15s',
                                        borderColor: activeLetter === null ? 'var(--green)' : 'var(--border)',
                                        background: activeLetter === null ? 'var(--green)' : '#fff',
                                        color: activeLetter === null ? '#fff' : 'var(--text-secondary)',
                                    }}
                                >All</button>
                                {allLetters.map(letter => (
                                    <button
                                        key={letter}
                                        onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                                        style={{
                                            width: '34px', height: '34px', borderRadius: '7px', border: '1.5px solid',
                                            fontFamily: 'inherit', fontSize: '13px', fontWeight: 700,
                                            cursor: 'pointer', transition: 'all .15s',
                                            borderColor: activeLetter === letter ? 'var(--green)' : 'var(--border)',
                                            background: activeLetter === letter ? 'var(--green)' : '#fff',
                                            color: activeLetter === letter ? '#fff' : 'var(--text-secondary)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >{letter}</button>
                                ))}
                            </div>

                            {/* Glossary groups */}
                            {filteredGlossary.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '14px', border: '1px solid var(--border)' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>search_off</span>
                                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>No terms found</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Try a different search term or clear the filter.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    {filteredGlossary.map(group => (
                                        <div key={group.letter}>
                                            {/* Letter heading */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '10px',
                                                    background: 'var(--green)', color: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '18px', fontWeight: 800, flexShrink: 0,
                                                }}>{group.letter}</div>
                                                <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{group.entries.length} {group.entries.length === 1 ? 'term' : 'terms'}</span>
                                            </div>

                                            {/* Term cards */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px' }}>
                                                {group.entries.map((entry, i) => (
                                                    <div key={i} style={{
                                                        background: '#fff',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: '12px',
                                                        padding: '16px 18px',
                                                        borderLeft: '3px solid var(--green)',
                                                        transition: 'box-shadow .2s, transform .2s',
                                                        cursor: 'default',
                                                    }}
                                                        onMouseEnter={e => {
                                                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.09)';
                                                            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
                                                        }}
                                                        onMouseLeave={e => {
                                                            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                                                            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                                        }}
                                                    >
                                                        <p style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{entry.term}</p>
                                                        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.definition}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══════════════════ COURT FORMAT TAB ══════════════════ */}
                    {activeTab === 'courtformat' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                            {/* Intro banner */}
                            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '26px', color: 'var(--green)' }}>description</span>
                                </div>
                                <div>
                                    <h2 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Court Format Template</h2>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        Legal transcripts follow a strict format that captures every word spoken with full accuracy. Below are the core formatting rules used in professional court and legal transcription, followed by a real sample interrogation transcript demonstrating these rules in practice.
                                    </p>
                                </div>
                            </div>

                            {/* Formatting rules grid */}
                            <div>
                                <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Formatting Rules</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                                    {courtFormatRules.map((rule, i) => (
                                        <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: rule.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: rule.color }}>{rule.icon}</span>
                                                </div>
                                                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.title}</h4>
                                            </div>
                                            <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{rule.desc}</p>
                                            {/* Example box */}
                                            <div style={{ background: '#F4F7F6', borderRadius: '8px', padding: '10px 14px', borderLeft: `3px solid ${rule.color}` }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Example</p>
                                                <pre style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '11.5px', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{rule.example}</pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sample transcript */}
                            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                                {/* Header bar */}
                                <div style={{ background: 'var(--green)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'white' }}>article</span>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'white' }}>Sample Interrogation Transcript</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,.75)', marginTop: '2px' }}>Court Format Template — Practice Document</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['Verbatim', 'Legal Format', 'Q&A Style'].map((tag, i) => (
                                            <span key={i} style={{ background: 'rgba(255,255,255,.18)', color: 'white', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Callout tips */}
                                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {[
                                        { icon: 'person', color: '#3B82F6', bg: '#EFF6FF', text: 'Speaker labels in ALL CAPS' },
                                        { icon: 'hearing', color: '#F59E0B', bg: '#FEF3C7', text: '[indiscernible] for unclear audio' },
                                        { icon: 'notes', color: 'var(--green)', bg: 'var(--green-light)', text: 'Verbatim — non-standard grammar preserved' },
                                    ].map((tip, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: tip.bg, borderRadius: '8px', padding: '6px 12px' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: tip.color }}>{tip.icon}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 600, color: tip.color }}>{tip.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Transcript body */}
                                <div style={{ padding: '28px 32px', maxHeight: '560px', overflowY: 'auto' }}>
                                    <pre style={{
                                        margin: 0,
                                        fontFamily: "'Courier New', Courier, monospace",
                                        fontSize: '13px',
                                        lineHeight: 1.85,
                                        color: 'var(--text-primary)',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }}>
                                        {sampleTranscript.split('\n').map((line, i) => {
                                            const isSpeaker = /^[A-Z ]+:$/.test(line.trim());
                                            return (
                                                <span key={i}>
                                                    {isSpeaker
                                                        ? <strong style={{ color: 'var(--green)', fontWeight: 700 }}>{line}</strong>
                                                        : line.includes('[indiscernible]')
                                                            ? <span>{line.replace('[indiscernible]', '')}<mark style={{ background: '#FEF3C7', color: '#92400E', borderRadius: '3px', padding: '0 3px', fontWeight: 600 }}>[indiscernible]</mark></span>
                                                            : line}
                                                    {'\n'}
                                                </span>
                                            );
                                        })}
                                    </pre>
                                </div>

                                {/* Footer */}
                                <div style={{ padding: '14px 24px', background: '#F9FAFB', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Source: TCI Court Format Practice Template</span>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>info</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>For practice purposes only</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick reference card */}
                            <div style={{ background: 'linear-gradient(135deg, #EEF0FF 0%, #E8F5F1 100%)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 28px' }}>
                                <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--purple)' }}>bolt</span>
                                    Quick Reference Checklist
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                                    {[
                                        'Speaker labels in ALL CAPS followed by a colon',
                                        'New paragraph for each speaker turn',
                                        'Blank line between different speakers',
                                        'Transcribe verbatim — including filler words',
                                        'Use [indiscernible] for inaudible audio',
                                        'Bracket editorial notes: [laughs], [pause]',
                                        'Standard sentence punctuation within turns',
                                        'Number pages sequentially',
                                        'Preserve non-standard grammar exactly as spoken',
                                        'Mark timestamps if required by the client',
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', background: '#fff', borderRadius: '9px', padding: '10px 14px', border: '1px solid var(--border)' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--green)', flexShrink: 0, marginTop: '1px' }}>check_circle</span>
                                            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </DashboardLayout>
    );
};

export default LegalTranscriptionTipsPage;
