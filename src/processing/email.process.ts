import { Job } from "bull";

const emailProcess = async (job: Job) => {
  await console.log(job.data);
};

export default emailProcess;