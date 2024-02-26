import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/* Form Imports */
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

/* Radio Group Imports */
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

export const QuizAssignment = () => {
  // 1. Define your form schema
  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters' })
      .max(50),
    multipleChoiceQuestionOne: z.enum(['a', 'b', 'c', 'd'], {
      required_error: 'You need to select an answer.',
    }),
    multipleChoiceQuestionTwo: z.enum(['1', '2', '3', '4'], {
      required_error: 'You need to select an answer.',
    }),
    shortAnswerQuestionOne: z
      .string()
      .min(10, 'Your answer must be at least 10 characters')
      .max(50),
    shortAnswerQuestionTwo: z
      .string()
      .min(10, 'Your answer must be at least 10 characters')
      .max(50),
    // This field needs validation. 👇🏻
    assignment: z.any({
      required_error: 'You need to upload an assignment.',
    }),
  });

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      // multipleChoiceQuestionOne: undefined,
      // multipleChoiceQuestionTwo: undefined,
      shortAnswerQuestionOne: '',
      shortAnswerQuestionTwo: '',
      assignment: '',
    },
  });

  // 3. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/2 space-y-6'>
        {/* Short Answer Question 👇🏻 */}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Please enter a username' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Multiple Choice Question 👇🏻 */}
        <FormField
          control={form.control}
          name='multipleChoiceQuestionOne'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>This is a multiple choice question.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  {/* This is where the multiple choice options are  */}
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='a'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>A</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='b'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>B</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='c'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>C</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='d'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>D</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Multiple Choice Question 👇🏻 */}
        <FormField
          control={form.control}
          name='multipleChoiceQuestionTwo'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>This is a multiple choice question.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  {/* This is where the multiple choice options are  */}
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='1'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>1</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>2</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>3</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='4'></RadioGroupItem>
                    </FormControl>
                    <FormLabel className='font-normal'>4</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Short Answer Question 👇🏻 */}
        <FormField
          control={form.control}
          name='shortAnswerQuestionOne'
          render={({ field }) => (
            <FormItem>
              <FormLabel>This is a short answer question.</FormLabel>
              <FormControl>
                <Input placeholder='Please enter your answer' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Short Answer Question 👇🏻 */}
        <FormField
          control={form.control}
          name='shortAnswerQuestionTwo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>This is a short answer question.</FormLabel>
              <FormControl>
                <Input placeholder='Please enter your answer' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Assignment 👇🏻 */}
        <FormField
          control={form.control}
          name='assignment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>This is an assignment.</FormLabel>
              <FormControl>
                <Input id='assignment' type='file' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
