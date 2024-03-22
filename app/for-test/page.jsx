import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Test = () => {
  return (
    <Collapsible>
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </div>
        <div>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </div>
        <div>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Test
