import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    TypographyH1,
    TypographyH2,
    TypographyH4,
} from '@/components/ui/typography';
import BgPattern from '@/utils/BgPattern';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Job() {
    const params = useParams();
    const [job, setJob] = React.useState({});

    const applyForTheJob = () => {
        console.log('Applying for the job');
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/posts/${params.jobId}`
                );
                setJob(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJob();
    }, [params.jobId]);

    return (
        <>
            <Navbar />
            <BgPattern />

            <div className="mb-10 relative" key={job._id}>
                <div className="my-4">
                    <TypographyH1>{job.title}</TypographyH1>
                    <TypographyH4>{job.company}</TypographyH4>
                    <TypographyH4>{job.location}</TypographyH4>
                </div>
                <TypographyH4 className="my-6">
                    {job.description}
                </TypographyH4>
                <Card className="bg-slate-900/80 my-4">
                    <CardHeader>
                        <TypographyH2>Requirements</TypographyH2>
                    </CardHeader>
                    <CardContent>
                        {job.content}
                        {job?.devRequirements?.map((ele) => (
                            <p
                                key={ele}
                                className="text-lg hover:text-foreground/80"
                            >
                                {ele}
                            </p>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/80 my-4">
                    <CardHeader>
                        <p>
                            {job?.tags?.map((ele, index) => {
                                return <span key={index}>{ele}</span>
                            })}
                        </p>
                    </CardHeader>
                    <CardContent>
                        {job?.benefits?.map((ele) => (
                            <p
                                key={ele}
                                className="text-lg hover:text-foreground/80"
                            >
                                {ele}
                            </p>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex justify-around items-center my-4">
                    <Button className="text-xl" size="lg" onclick={applyForTheJob} asChild>
                        <a href="">Apply</a>
                    </Button>
                </div>
            </div>
        </>
    );
}
