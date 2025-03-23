import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

export const Stats = ({ stats } : { stats: { title: string; value: string}[]; description?: string }) => {
    
    const StatCard = ({title, value, description}: {title: string, value: string, description?: string}) => {
        return(
            <Card className="shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </CardContent>
            </Card>
        )
    }

    return(
        <div className={`grid gap-4`}
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`}}
        >
            {
                stats.map((stat, index) => <StatCard {...stat} key={`stat-card-${index}`} />)
            }
        </div>
    )
}
