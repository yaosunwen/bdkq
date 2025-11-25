import asyncio
import pythonmonkey as pm


async def async_fn():
    pm.require('./my.cjs')
    await pm.eval("""
    new Promise((resolve) => setTimeout((...args) => {
        console.log(args);
        resolve();
      }, 1000, 42, "abc")
    )
  """)
    await pm.eval("async (x) => await x")(asyncio.sleep(0.5))


print("start")
asyncio.run(async_fn())
print("end")