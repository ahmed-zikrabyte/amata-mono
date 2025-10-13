/* eslint-disable jsx-a11y/alt-text */
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image,
  Link,
} from "lucide-react";
import { Toggle } from "@workspace/ui/components/toggle";
import { Button } from "@workspace/ui/components/button";
import { FontControls } from "./font-controller";
import { ColorPicker } from "./color-picker";
import { toast } from "sonner";
// Custom link extension configuration
export const customLinkConfig = {
  openOnClick: true, // Enable click handling
  HTMLAttributes: {
    class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
    target: '_blank', // Open links in new tab
    rel: 'noopener noreferrer', // Security best practice for external links
  },
};
interface MenuBarProps {
  editor: Editor;
}
export function MenuBar({ editor }: MenuBarProps) {
  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Ensure file is an image
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed."
      );
      return;
    }
    // Convert the image to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      if (base64String) {
        // Insert image directly
        editor.commands.setImage({ src: base64String });
        // Optionally reset the input value to avoid re-triggering the event
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const text = editor.state.selection.empty
      ? prompt("Link text:", "")
      : editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to
        );
    if (text) {
      const url = prompt("Link URL:", previousUrl ?? "");
      if (url) {
        // Ensure URL has proper protocol
        const properUrl = url.startsWith('http://') || url.startsWith('https://')
          ? url
          : `https://${url}`;
        if (editor.state.selection.empty) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "text",
              text: text,
              marks: [
                {
                  type: "link",
                  attrs: { 
                    href: properUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  },
                },
              ],
            })
            .run();
        } else {
          editor.chain().focus().setLink({ 
            href: properUrl,
            target: '_blank',
            rel: 'noopener noreferrer'
          }).run();
        }
      }
    }
  };
  return (
    <div className="border-b p-2 md:flex flex-wrap gap-2">
      <div className="lg:flex items-center gap-1">
        <FontControls editor={editor} />
        <ColorPicker editor={editor} />  {/* Add this line */}
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </div>
      {/* Heading Controls */}
      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
      </div>
      {/* Alignment Controls */}
      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>
      {/* List Controls */}
      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote className="h-4 w-4" />
        </Toggle>
      </div>
      {/* Undo/Redo Controls */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      {/* Image and Link Controls */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={addImage}
            style={{ display: "none" }}
            id="upload-image"
          />
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => document.getElementById("upload-image")?.click()}
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>
        <Button type="button" size="sm" variant="ghost" onClick={setLink}>
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}


// "use client";
// import type { Editor } from "@tiptap/react";
// import type React from "react";

// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
//   Link,
//   Unlink,
//   Image,
//   Table,
//   Undo,
//   Redo,
//   Palette,
//   Loader2,
//   Type,
//   TextCursorInput,
//   TextQuote,
//   Code,
//   Strikethrough,
//   PilcrowSquare,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
//   DropdownMenuLabel,
// } from "@/components/ui/dropdown-menu";
// import { useState, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface MenuBarProps {
//   editor: Editor;
// }

// export function MenuBar({ editor }: MenuBarProps) {
//   const [linkUrl, setLinkUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   if (!editor) {
//     return null;
//   }

//   const addLink = () => {
//     if (linkUrl) {
//       editor
//         .chain()
//         .focus()
//         .extendMarkRange("link")
//         .setLink({ href: linkUrl })
//         .run();
//       setLinkUrl("");
//     }
//   };

//   const addImageUrl = () => {
//     if (imageUrl) {
//       editor.chain().focus().setImage({ src: imageUrl }).run();
//       setImageUrl("");
//     }
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsUploading(true);

//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size must be less than 5MB");
//         return;
//       }

//       // Validate file type
//       const validTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/avif",
//         "image/gif",
//         "image/webp",
//       ];
//       if (!validTypes.includes(file.type)) {
//         toast.error(
//           "Only JPG, JPEG, PNG, AVIF, GIF and WEBP files are allowed"
//         );
//         return;
//       }

//       // Convert to base64 for preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         editor.chain().focus().setImage({ src: result }).run();
//         setIsUploading(false);
//       };
//       reader.readAsDataURL(file);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image");
//       setIsUploading(false);
//     } finally {
//       // Reset the file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const addTable = () => {
//     editor
//       .chain()
//       .focus()
//       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//       .run();
//   };

//   // Font sizes in px
//   const fontSizes = [
//     { label: "Tiny", value: "12px" },
//     { label: "Small", value: "14px" },
//     { label: "Normal", value: "16px" },
//     { label: "Medium", value: "18px" },
//     { label: "Large", value: "20px" },
//     { label: "X-Large", value: "24px" },
//     { label: "XX-Large", value: "32px" },
//     { label: "Huge", value: "40px" },
//   ];

//   // Font families
//   const fontFamilies = [
//     { label: "Default", value: "Inter, sans-serif" },
//     { label: "Serif", value: "Georgia, serif" },
//     { label: "Monospace", value: "monospace" },
//     { label: "Arial", value: "Arial, sans-serif" },
//     { label: "Times New Roman", value: "Times New Roman, serif" },
//     { label: "Courier New", value: "Courier New, monospace" },
//     { label: "Verdana", value: "Verdana, sans-serif" },
//     { label: "Tahoma", value: "Tahoma, sans-serif" },
//   ];

//   // Color palettes
//   const colorPalettes = {
//     basic: [
//       "#000000", // Black
//       "#FFFFFF", // White
//       "#FF0000", // Red
//       "#00FF00", // Green
//       "#0000FF", // Blue
//       "#FFFF00", // Yellow
//       "#FF00FF", // Magenta
//       "#00FFFF", // Cyan
//     ],
//     grayscale: [
//       "#000000", // Black
//       "#333333",
//       "#666666",
//       "#999999",
//       "#CCCCCC",
//       "#EEEEEE",
//       "#F8F8F8",
//       "#FFFFFF", // White
//     ],
//     material: [
//       "#F44336", // Red
//       "#E91E63", // Pink
//       "#9C27B0", // Purple
//       "#673AB7", // Deep Purple
//       "#3F51B5", // Indigo
//       "#2196F3", // Blue
//       "#03A9F4", // Light Blue
//       "#00BCD4", // Cyan
//       "#009688", // Teal
//       "#4CAF50", // Green
//       "#8BC34A", // Light Green
//       "#CDDC39", // Lime
//       "#FFEB3B", // Yellow
//       "#FFC107", // Amber
//       "#FF9800", // Orange
//       "#FF5722", // Deep Orange
//     ],
//   };

//   return (
//     <div className="border-b p-2 flex flex-wrap gap-1 items-center">
//       {/* Text Style Controls */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "bg-muted" : ""}
//         title="Bold"
//       >
//         <Bold className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "bg-muted" : ""}
//         title="Italic"
//       >
//         <Italic className="h-4 w-4" />
//       </Button>
//       {/* Uncomment after adding the Underline extension */}
//       {/* <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "bg-muted" : ""}
//         title="Underline"
//       >
//         <Underline className="h-4 w-4" />
//       </Button> */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "bg-muted" : ""}
//         title="Strikethrough"
//       >
//         <Strikethrough className="h-4 w-4" />
//       </Button>

//       <div className="h-6 w-px bg-border mx-1" />

//       {/* Font Family Dropdown */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="sm" className="gap-1 h-8">
//             <Type className="h-4 w-4" />
//             <span className="hidden sm:inline">Font</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuLabel>Font Family</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {fontFamilies.map((font) => (
//             <DropdownMenuItem
//               key={font.value}
//               onClick={() =>
//                 editor.chain().focus().setFontFamily(font.value).run()
//               }
//               className={
//                 editor.isActive("textStyle", { fontFamily: font.value })
//                   ? "bg-muted"
//                   : ""
//               }
//             >
//               <span style={{ fontFamily: font.value }}>{font.label}</span>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Font Size Dropdown */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="sm" className="gap-1 h-8">
//             <TextCursorInput className="h-4 w-4" />
//             <span className="hidden sm:inline">Size</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuLabel>Font Size</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {fontSizes.map((size) => (
//             <DropdownMenuItem
//               key={size.value}
//               onClick={() =>
//                 editor.chain().focus().setFontSize(size.value).run()
//               }
//               className={
//                 editor.isActive("textStyle", { fontSize: size.value })
//                   ? "bg-muted"
//                   : ""
//               }
//             >
//               <span style={{ fontSize: size.value }}>{size.label}</span>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <div className="h-6 w-px bg-border mx-1" />

//       {/* Lists */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "bg-muted" : ""}
//         title="Bullet List"
//       >
//         <List className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "bg-muted" : ""}
//         title="Numbered List"
//       >
//         <ListOrdered className="h-4 w-4" />
//       </Button>

//       {/* Indentation */}
//       {/* Uncomment after adding the Indent extension */}
//       {/* <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().indent().run()}
//         title="Indent"
//       >
//         <Indent className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().outdent().run()}
//         title="Outdent"
//       >
//         <Outdent className="h-4 w-4" />
//       </Button> */}

//       <div className="h-6 w-px bg-border mx-1" />

//       {/* Paragraph Styles */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="sm" className="gap-1 h-8">
//             <PilcrowSquare className="h-4 w-4" />
//             <span className="hidden sm:inline">Paragraph</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem
//             onClick={() => editor.chain().focus().setParagraph().run()}
//             className={editor.isActive("paragraph") ? "bg-muted" : ""}
//           >
//             Normal Text
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 1 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
//             }
//           >
//             <span className="text-2xl font-bold">Heading 1</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
//             }
//           >
//             <span className="text-xl font-bold">Heading 2</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""
//             }
//           >
//             <span className="text-lg font-bold">Heading 3</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 4 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 4 }) ? "bg-muted" : ""
//             }
//           >
//             <span className="text-base font-bold">Heading 4</span>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//             className={editor.isActive("codeBlock") ? "bg-muted" : ""}
//           >
//             <Code className="h-4 w-4 mr-2" />
//             Code Block
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             className={editor.isActive("blockquote") ? "bg-muted" : ""}
//           >
//             <TextQuote className="h-4 w-4 mr-2" />
//             Blockquote
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Alignment */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().setTextAlign("left").run()}
//         className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
//         title="Align Left"
//       >
//         <AlignLeft className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().setTextAlign("center").run()}
//         className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
//         title="Align Center"
//       >
//         <AlignCenter className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().setTextAlign("right").run()}
//         className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
//         title="Align Right"
//       >
//         <AlignRight className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//         className={editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""}
//         title="Justify"
//       >
//         <AlignJustify className="h-4 w-4" />
//       </Button>

//       <div className="h-6 w-px bg-border mx-1" />

//       {/* Links */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" title="Add Link">
//             <Link className="h-4 w-4" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80">
//           <div className="grid gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="link">Link URL</Label>
//               <div className="flex gap-2">
//                 <Input
//                   id="link"
//                   placeholder="https://example.com"
//                   value={linkUrl}
//                   onChange={(e) => setLinkUrl(e.target.value)}
//                 />
//                 <Button onClick={addLink}>Add</Button>
//               </div>
//             </div>
//           </div>
//         </PopoverContent>
//       </Popover>

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().unsetLink().run()}
//         disabled={!editor.isActive("link")}
//         title="Remove Link"
//       >
//         <Unlink className="h-4 w-4" />
//       </Button>

//       {/* Images */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" title="Add Image">
//             <Image className="h-4 w-4" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80">
//           <div className="grid gap-4">
//             <div className="space-y-2">
//               <Label>Add Image</Label>
//               <div className="flex flex-col gap-2">
//                 <Button onClick={triggerFileInput} disabled={isUploading}>
//                   {isUploading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Uploading...
//                     </>
//                   ) : (
//                     "Upload from device"
//                   )}
//                 </Button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <div className="flex items-center">
//                   <div className="h-px flex-1 bg-border" />
//                   <span className="px-2 text-xs text-muted-foreground">OR</span>
//                   <div className="h-px flex-1 bg-border" />
//                 </div>
//                 <Label htmlFor="imageUrl">Image URL</Label>
//                 <div className="flex gap-2">
//                   <Input
//                     id="imageUrl"
//                     placeholder="https://example.com/image.jpg"
//                     value={imageUrl}
//                     onChange={(e) => setImageUrl(e.target.value)}
//                   />
//                   <Button onClick={addImageUrl}>Add</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </PopoverContent>
//       </Popover>

//       {/* Table */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={addTable}
//         title="Insert Table"
//       >
//         <Table className="h-4 w-4" />
//       </Button>

//       {/* Enhanced Color Picker */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" title="Text Color">
//             <Palette className="h-4 w-4" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80">
//           <Tabs defaultValue="basic">
//             <TabsList className="grid grid-cols-3">
//               <TabsTrigger value="basic">Basic</TabsTrigger>
//               <TabsTrigger value="grayscale">Grayscale</TabsTrigger>
//               <TabsTrigger value="material">Material</TabsTrigger>
//             </TabsList>
//             <TabsContent value="basic" className="mt-2">
//               <div className="grid grid-cols-8 gap-1">
//                 {colorPalettes.basic.map((color) => (
//                   <Button
//                     key={color}
//                     variant="outline"
//                     className="w-8 h-8 p-0 rounded-md"
//                     style={{
//                       backgroundColor: color,
//                       border:
//                         color === "#FFFFFF" ? "1px solid #e2e8f0" : "none",
//                     }}
//                     onClick={() => editor.chain().focus().setColor(color).run()}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//             <TabsContent value="grayscale" className="mt-2">
//               <div className="grid grid-cols-8 gap-1">
//                 {colorPalettes.grayscale.map((color) => (
//                   <Button
//                     key={color}
//                     variant="outline"
//                     className="w-8 h-8 p-0 rounded-md"
//                     style={{
//                       backgroundColor: color,
//                       border:
//                         color === "#FFFFFF" ? "1px solid #e2e8f0" : "none",
//                     }}
//                     onClick={() => editor.chain().focus().setColor(color).run()}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//             <TabsContent value="material" className="mt-2">
//               <div className="grid grid-cols-8 gap-1">
//                 {colorPalettes.material.map((color) => (
//                   <Button
//                     key={color}
//                     variant="outline"
//                     className="w-8 h-8 p-0 rounded-md"
//                     style={{ backgroundColor: color }}
//                     onClick={() => editor.chain().focus().setColor(color).run()}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//             <div className="mt-4">
//               <Label>Current Color</Label>
//               <div className="flex items-center gap-2 mt-1">
//                 <div
//                   className="w-8 h-8 rounded-md border"
//                   style={{
//                     backgroundColor:
//                       editor.getAttributes("textStyle").color || "#000000",
//                   }}
//                 />
//                 <span>
//                   {editor.getAttributes("textStyle").color || "#000000"}
//                 </span>
//               </div>
//             </div>
//           </Tabs>
//         </PopoverContent>
//       </Popover>

//       <div className="h-6 w-px bg-border mx-1" />

//       {/* Undo/Redo */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//         title="Undo"
//       >
//         <Undo className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//         title="Redo"
//       >
//         <Redo className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }