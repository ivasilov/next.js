import { nextBuild } from 'next-test-utils'

describe('worker-restart', () => {
  it('should properly exhaust all restart attempts and not fail with any worker errors', async () => {
    const { stdout, stderr } = await nextBuild(__dirname, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain(
      'Restarted static page generation for /bad-page because it took more than 10 seconds'
    )
    expect(output).toContain(
      'Static page generation for /bad-page is still timing out after 3 attempts'
    )
    expect(output).not.toContain(
      'Error: Farm is ended, no more calls can be done to it'
    )
  })
})
