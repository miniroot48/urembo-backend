import { execSync } from 'child_process';
import path from 'path';

console.log('🌱 Starting test data seeding process...');

try {
  // Run the test data seed script
  execSync('npx ts-node scripts/seed-test-data.ts', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log('✅ Test data seeding completed successfully!');
} catch (error) {
  console.error('❌ Test data seeding failed:', error);
  process.exit(1);
}
