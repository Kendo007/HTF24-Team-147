import JobCard from '@/components/job/JobCard';
import JobForm from '@/components/job/JobForm';
import Navbar from '@/components/navbar/Navbar';
import { TypographyH1, TypographyH4 } from '@/components/ui/typography';
import BgPattern from '@/utils/BgPattern';
import ListRender from '@/utils/ListRender';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Jobs() {
    // const jobs = [
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    //     {
    //         title: 'Frontend Engineer',
    //         company: 'Acme Corporation',
    //         location: 'Remote',
    //         description:
    //             'We are looking for a talented Frontend Engineer to join our team.',
    //     },
    // ];
    const [jobs, setJobs] = useState([]);
    const [jobForm, setJobForm] = useState(false);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/posts');
                setJobs(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, []);
    return (
        <>
            <Navbar />
            <BgPattern />

            <div className="relative">
                <div className="mb-8 text-center w-full flex justify-center items-end gap-[5%]">
                    <TypographyH1>Jobs</TypographyH1>
                    <button
                        className={`p-2 px-4 bg-[#387ed1] text-black rounded-lg justify-self-end`}
                        onClick={() => {
                            setJobForm(!jobForm);
                        }}
                    >
                        {jobForm ? '❌' : 'Create Post'}
                    </button>
                </div>
                {jobForm && <JobForm />}
                <div className="w-full min-h-[60vh] flex flex-col justify-center items-center space-y-6">
                    {jobs.length > 0 ? (
                        <ListRender
                            data={jobs}
                            ItemRender={JobCard}
                        />
                    ) : (
                        <TypographyH4 className={`text-center`}>
                            NO JOBS FOUND
                        </TypographyH4>
                    )}
                </div>
            </div>
        </>
    );
}
