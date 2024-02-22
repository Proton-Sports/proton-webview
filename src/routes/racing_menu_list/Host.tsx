import { useState, type FormEvent } from 'react';
import Button from '../../lib/components/Button';
import TextArea from '../../lib/components/TextArea';
import Input from '../../lib/components/Input';
import Radio from '../../lib/components/Radio';
import { Label, RadioGroup } from 'react-aria-components';
import Checkbox from '../../lib/components/Checkbox';
import { Radio as AriaRadio } from 'react-aria-components';
import clsx from 'clsx';

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  alt.emit('race-host:submit', { ...data, ghosting: data.ghosting === 'on' });
}

export default function Host() {
  const [availableRaces] = useState(new Array(10).fill(0).map((_, i) => `Race #${i}`));

  return (
    <div className="fixed p-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-bg-2 w-[56rem] rounded-xl">
      <form className="flex gap-8" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h4 className="leading-none uppercase fugaz text-fg-1/40 w-max">Available races</h4>
          <Input type="text" placeholder="Search" />
          <RadioGroup aria-label="Races" name="raceId" isRequired>
            <ul className="pr-2 space-y-2 overflow-auto max-h-96">
              {availableRaces.map((race) => (
                <AriaRadio key={race} value={race} className="block">
                  {({ isSelected }) => (
                    <button
                      type="button"
                      className={clsx(
                        'w-full p-2 text-left rounded transition ease-in-out duration-75',
                        isSelected ? 'bg-fg text-bg' : 'bg-bg-1 hover:bg-bg-hover'
                      )}
                    >
                      {race}
                    </button>
                  )}
                </AriaRadio>
              ))}
            </ul>
          </RadioGroup>
        </div>

        <div>
          <h4 className="leading-none uppercase fugaz text-fg-1/40">Settings</h4>
          <div className="flex gap-8">
            <div className="gap-4 mt-2 space-y-4">
              <div>
                <label htmlFor="vehicleName">Vehicle name</label>
                <Input id="vehicleName" name="vehicleName" required />
              </div>
              <div>
                <label htmlFor="duration">Duration (seconds)</label>
                <Input type="number" id="duration" name="duration" defaultValue={120} min={0} required />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Description..."
                  className="block resize-none bg-bg-1"
                  cols={50}
                  rows={4}
                />
              </div>
              <div className="space-x-2">
                <Checkbox id="ghosting" name="ghosting">
                  Enable phasing/ghosting (no collision)
                </Checkbox>
              </div>
            </div>
            <div className="mt-2 space-y-4">
              <RadioGroup name="type" defaultValue="byLaps" className="w-full space-y-2">
                {({ state: { selectedValue } }) => (
                  <>
                    <Label className="uppercase fugaz">Type</Label>
                    <div className="flex justify-between">
                      <Radio value="byLaps" className="w-max">
                        By laps
                      </Radio>
                      <Input
                        type="number"
                        defaultValue={1}
                        min={1}
                        name="laps"
                        className="ml-5 w-32"
                        disabled={selectedValue !== 'byLaps'}
                        required
                      />
                    </div>
                    <Radio value="pointToPoint">Point to point</Radio>
                  </>
                )}
              </RadioGroup>

              <RadioGroup name="time" defaultValue="earlyMorning" className="w-full space-y-2">
                {({ state }) => (
                  <>
                    <Label className="uppercase fugaz">Time</Label>
                    <Radio value="earlyMorning">Early morning</Radio>
                    <Radio value="midday">Mid-day</Radio>
                    <Radio value="night">Night</Radio>
                    <div className="flex justify-between">
                      <Radio value="exactTime" className="w-max">
                        Exact time
                      </Radio>
                      <Input
                        type="time"
                        name="exactTime"
                        className="ml-5 w-32"
                        disabled={state.selectedValue !== 'exactTime'}
                        defaultValue="08:00"
                        required
                      />
                    </div>
                  </>
                )}
              </RadioGroup>
              <RadioGroup name="weather" defaultValue="clear" className="w-full space-y-2">
                <Label className="uppercase fugaz">Weather</Label>
                <Radio value="rainy">Rainy</Radio>
                <Radio value="clear">Clear</Radio>
                <Radio value="foggy">Foggy</Radio>
              </RadioGroup>
            </div>
          </div>
          <Button variant="primary" className="block mt-8 ml-auto uppercase fugaz">
            Host race
          </Button>
        </div>
      </form>
    </div>
  );
}
