const { assert } = require('chai')
const { FormControlStatic } = require('react-bootstrap')

const Meme =artifacts.require("Meme")

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Meme',(accounts)=>
{
    let meme
    before(async()=>{
        meme=await Meme.deployed()
    })
    describe('deployment',async()=>
    {
        it('deployes succesfully',async()=>
        {
            meme = await Meme.deployed()
            const address = meme.address
            assert.notEqual(address,"")
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
            assert.notEqual(address,0x0)
        })
    })

    describe('storage',async()=>
    {
        it('updates the memehash',async()=>
        {
            let memeHash
            memeHash='abs123'
            await meme.set(memeHash)
            const result = await meme.get()
            assert.equal(result,memeHash)
        })
    })
})