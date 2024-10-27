import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
    TypographyH3,
    TypographyH4,
    TypographyP,
} from '../ui/typography';

export default function JobCard({ key, _id, title, projManager, location, content }) {
    return (
        <a href={`/jobs/${_id}`} key={key}>
            <Card className="max-w-96 bg-slate-900/60 backdrop-blur-sm hover:scale-105 transition hover:border-primary/50">
                <CardHeader>
                    <TypographyH3>{title}</TypographyH3>
                    <TypographyH4 className="text-muted-foreground">
                        {content}
                    </TypographyH4>
                    <TypographyH4 className="text-muted-foreground">
                        {location}
                    </TypographyH4>
                </CardHeader>
                <CardContent>
                    <TypographyP>{projManager}</TypographyP>
                </CardContent>
            </Card>
        </a>
    );
}
