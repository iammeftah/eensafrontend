import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { BookOpen, Calendar, GraduationCap, Users } from "lucide-react"
import { Hero } from "../components/ui/animated-hero"
import { Button } from "../components/ui/button"
import AnimatedSkillEquilibriumChart from "../components/ui/AnimatedSkillEquilibriumChart"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            <Header />

            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <h2 className="mb-12 text-center text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                        Everything You Need to Succeed
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: <GraduationCap className="h-8 w-8 text-[#8B4513]" />,
                                title: "Course Management",
                                description: "Access all your course materials, assignments, and grades in one place"
                            },
                            {
                                icon: <BookOpen className="h-8 w-8 text-[#8B4513]" />,
                                title: "Digital Library",
                                description: "Access a vast collection of academic resources and research materials"
                            },
                            {
                                icon: <Users className="h-8 w-8 text-[#8B4513]" />,
                                title: "Student Community",
                                description: "Connect with fellow students, join study groups, and collaborate on projects"
                            },
                            {
                                icon: <Calendar className="h-8 w-8 text-[#8B4513]" />,
                                title: "Schedule Planning",
                                description: "Manage your class schedule, deadlines, and academic calendar efficiently"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="rounded-lg p-6 shadow-lg transition-transform hover:scale-105 bg-white/80 dark:bg-neutral-800/50">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Balancing Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <AnimatedSkillEquilibriumChart />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-6 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                                AI-Powered Team Balancing
                            </h2>
                            <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                                Our web app uses advanced AI algorithms to analyze skills and create balanced project teams.
                                Whether you're working on a group assignment or a collaborative project, our tool ensures
                                every team has the right mix of expertise.
                            </p>
                            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                                Simply input your team members' skills, and let our AI do the rest. It shuffles and assigns
                                roles to maximize efficiency and collaboration.
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="bg-[#8B4513] hover:bg-[#7a3a0f] text-white dark:bg-[#8B4513] dark:hover:bg-[#7a3a0f]"
                                >
                                    Try It Now
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-[#8B4513] text-[#8B4513] hover:bg-amber-50 dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}