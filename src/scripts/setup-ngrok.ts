import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface NgrokInfo {
  url: string;
  publicUrl: string;
  webhookUrl: string;
  successUrl: string;
  failureUrl: string;
}

async function setupNgrok(): Promise<NgrokInfo> {
  console.log('🚀 Setting up ngrok for Paystack webhook testing...\n');

  try {
    // Check if ngrok is installed
    try {
      await execAsync('ngrok version');
      console.log('✅ ngrok is installed');
    } catch (error) {
      console.log('❌ ngrok is not installed. Please install it first:');
      console.log('   npm install -g ngrok');
      console.log('   or download from https://ngrok.com');
      process.exit(1);
    }

    // Check if backend is running
    try {
      const response = await fetch('http://localhost:3000/health');
      if (response.ok) {
        console.log('✅ Backend is running on port 3000');
      } else {
        throw new Error('Backend not responding');
      }
    } catch (error) {
      console.log('❌ Backend is not running. Please start it first:');
      console.log('   npm run start:dev');
      process.exit(1);
    }

    // Start ngrok
    console.log('🌐 Starting ngrok tunnel...');
    const ngrokProcess = exec('ngrok http 3000 --log=stdout');
    
    // Wait a moment for ngrok to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get ngrok info
    try {
      const { stdout } = await execAsync('curl -s http://localhost:4040/api/tunnels');
      const tunnels = JSON.parse(stdout);
      
      if (tunnels.tunnels && tunnels.tunnels.length > 0) {
        const httpsTunnel = tunnels.tunnels.find((tunnel: any) => tunnel.proto === 'https');
        const httpTunnel = tunnels.tunnels.find((tunnel: any) => tunnel.proto === 'http');
        
        const tunnel = httpsTunnel || httpTunnel;
        
        if (tunnel) {
          const ngrokInfo: NgrokInfo = {
            url: tunnel.public_url,
            publicUrl: tunnel.public_url,
            webhookUrl: `${tunnel.public_url}/api/payments/callback/paystack`,
            successUrl: `${tunnel.public_url}/payment/success`,
            failureUrl: `${tunnel.public_url}/payment/failure`,
          };

          console.log('\n🎉 ngrok setup complete!');
          console.log('========================');
          console.log(`🌐 Public URL: ${ngrokInfo.publicUrl}`);
          console.log(`🔗 Webhook URL: ${ngrokInfo.webhookUrl}`);
          console.log(`✅ Success URL: ${ngrokInfo.successUrl}`);
          console.log(`❌ Failure URL: ${ngrokInfo.failureUrl}`);
          
          console.log('\n📋 Next steps:');
          console.log('1. Update Paystack webhook URL in dashboard:');
          console.log(`   ${ngrokInfo.webhookUrl}`);
          console.log('2. Update redirect URLs in your frontend:');
          console.log(`   Success: ${ngrokInfo.successUrl}`);
          console.log(`   Failure: ${ngrokInfo.failureUrl}`);
          console.log('3. Test webhook delivery in Paystack dashboard');
          console.log('4. Monitor requests at: http://localhost:4040');
          
          console.log('\n⚠️  Important:');
          console.log('- Keep this terminal open to maintain the tunnel');
          console.log('- The URL will change each time you restart ngrok');
          console.log('- Use ngrok paid plan for static URLs in production');
          
          return ngrokInfo;
        } else {
          throw new Error('No tunnel found');
        }
      } else {
        throw new Error('No tunnels found');
      }
    } catch (error) {
      console.log('❌ Failed to get ngrok tunnel info:', error);
      console.log('Please check if ngrok is running and try again');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ ngrok setup failed:', error);
    process.exit(1);
  }
}

// Run ngrok setup
if (require.main === module) {
  setupNgrok()
    .then(() => {
      console.log('\n✅ ngrok setup completed successfully');
      console.log('Press Ctrl+C to stop ngrok when done testing');
    })
    .catch((error) => {
      console.error('\n❌ ngrok setup failed:', error);
      process.exit(1);
    });
}

export { setupNgrok };
