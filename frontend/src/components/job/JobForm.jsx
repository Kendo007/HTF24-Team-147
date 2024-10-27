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
import axios from 'axios';

const JobForm = () => {
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        setSuccessMessage('');

        const {
            title,
            content,
            salary,
            jobType,
            lastApplicationDate,
            completionDate,
        } = e.target.elements;

        // Basic validation
        if (
            !title.value ||
            !content.value ||
            !salary.value ||
            !lastApplicationDate.value ||
            !completionDate.value
        ) {
            setShowError(true);
            return;
        }

        const formData = {
            project: '671e087ada2cfdfd4c423978',
            title: title.value,
            content: content.value,
            salary: salary.value,
            jobType: jobType.value,
            lastApplicationDate: lastApplicationDate.value,
            completionDate: completionDate.value,
        };

        console.log('formData:', formData);


        try {
            const response = await axios.post(
                'http://localhost:3000/api/posts',
                formData, // Send the constructed formData object
                { withCredentials: true } // This allows cookies to be sent with the request
            );

            if (response.status === 201) {
                setSuccessMessage(
                    'Job listing created successfully!'
                );
                e.target.reset();
            } else {
                console.log('Error creating job listing: ', response);
                setShowError(true);
            }
        } catch (error) {
            console.error('Error creating job listing:', error);
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">
                                Job Description
                            </Label>
                            <Textarea
                                id="content"
                                name="content"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                name="salary"
                                type="number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastApplicationDate">
                                Last Application Date
                            </Label>
                            <Input
                                id="lastApplicationDate"
                                name="lastApplicationDate"
                                type="date"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="completionDate">
                                Completition Date
                            </Label>
                            <Input
                                id="completionDate"
                                name="completionDate"
                                type="date"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select
                                name="jobType"
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
                                    Please fill in all fields
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
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Create Job
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default JobForm;
