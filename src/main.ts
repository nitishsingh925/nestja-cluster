import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as cluster from 'cluster';

// Get the number of available CPUs
const numCPUs = os.cpus().length;

// Set scheduling policy to round-robin
(cluster as any).schedulingPolicy = (cluster as any).SCHED_RR;

// Check if the current process is the primary process
if ((cluster as any).isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    (cluster as any).fork();
  }
  // Listen for dying workers
  (cluster as any).on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  };
  console.log(`Worker ${process.pid} started`);
  bootstrap();
}
