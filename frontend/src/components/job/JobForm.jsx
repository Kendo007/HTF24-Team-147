import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

const JobForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [jobType, setJobType] = useState('full-time');
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        setSuccessMessage('');

        // Basic validation
        if (!title || !description || !company || !salary) {
            setShowError(true);
            return;
        }

        const response = await fetch(
            'http://localhost:3000/api/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    description,
                    company,
                    salary,
                    jobType,
                }),
            }
        );

        if (response.ok) {
            setSuccessMessage('Job listing created successfully!');
            setTitle('');
            setDescription('');
            setCompany('');
            setSalary('');
            setJobType('full-time');
        } else {
            console.log('Error creating job listing');
            setShowError(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Create Job Listing
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Job Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">
                                Company Name
                            </Label>
                            <Input
                                id="company"
                                type="text"
                                value={company}
                                onChange={(e) =>
                                    setCompany(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                type="number"
                                value={salary}
                                onChange={(e) =>
                                    setSalary(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select
                                onValueChange={setJobType}
                                defaultValue="full-time"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full-time">
                                        Full-Time
                                    </SelectItem>
                                    <SelectItem value="part-time">
                                        Part-Time
                                    </SelectItem>
                                    <SelectItem value="contract">
                                        Contract
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {showError && (
                            <Alert
                                variant="destructive"
                                className="mt-4"
                            >
                                <AlertDescription>
                                    {'Please fill in all fields'}
                                </AlertDescription>
                            </Alert>
                        )}

                        {successMessage && (
                            <Alert variant="success" className="mt-4">
                                <AlertDescription>
                                    {successMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>
                        Create Job
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default JobForm;
