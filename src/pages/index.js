import Dashboard from "@/components/features/Dashboard";

export default function Home({ initialTasks }) {
  return <Dashboard serverSideTasks={initialTasks} />;
}

export const getServerSideProps = async () => {
  const initialTasks = {
    title: "Server Side Task",
    desc: "Server side task's desc",
    priority: 1,
    completed: false,
    id: 786,
  };

  return {
    props: {
      initialTasks,
    },
  };
};
