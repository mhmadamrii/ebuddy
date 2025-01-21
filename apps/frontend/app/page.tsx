import styles from './page.module.css'

import { Input } from '@repo/ui/input-mui'
import { Button } from '@repo/ui/button-mui'
import { FormControl } from '@repo/ui/form-mui'

export default function Home() {
  return (
    <div className={styles.page}>
      <FormControl
        style={{ border: '1px solid red', width: '100%', height: '100%' }}
      >
        <Input
          label='Your Name'
          variant='outlined'
          placeholder='Enter your name'
          fullWidth
        />
      </FormControl>
      <Button variant='contained' className='primary'>
        Submit
      </Button>
    </div>
  )
}
