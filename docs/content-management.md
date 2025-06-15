
# Content Management

Learn how to update your personal information, skills, and contact details.

## About Section

### Updating Your About Information

**File to Edit:** `src/components/About.tsx`

1. **Find the About component**
2. **Update the text content**:
   - Change the name in the first paragraph
   - Modify the description to match your background
   - Update the second paragraph with your interests and goals

**Example:**
```javascript
<p className="text-muted-foreground text-base md:text-lg mb-2">
  Hi! I'm [Your Name], an aspiring [Your Role] who finds joy in [Your Passion]. 
</p>
<p className="text-muted-foreground text-base md:text-lg">
  My work brings together [Your Skills]. I believe in [Your Philosophy].
</p>
```

## Skills Section

### Adding or Removing Skills

**File to Edit:** `src/components/Skills.tsx`

1. **Find the `skills` array** (around line 4)
2. **Add new skills** by adding them to the array:

```javascript
const skills = [
  "Python", "JavaScript", "TypeScript", "React", 
  "Your New Skill", // Add here
  "Another Skill"   // Add another one
];
```

3. **Remove skills** by deleting them from the array
4. **Reorder skills** by changing their position in the array

### Skill Categories

Consider organizing skills by type:
- **Programming Languages**: Python, JavaScript, TypeScript
- **Frameworks**: React, Next.js, Vue.js
- **Tools**: Git, Docker, AWS
- **Specialties**: AI/ML, Data Visualization, UI/UX

## Contact Information

### Updating Contact Details

**File to Edit:** `src/components/contact/ContactInfo.tsx`

1. **Find the `contactItems` array** (around line 8)
2. **Update each contact item**:

```javascript
{
  icon: Mail,
  title: "Email",
  value: "your-email@domain.com", // Change this
  description: "Drop me a line anytime" // Change this
},
{
  icon: Phone,
  title: "Phone", 
  value: "+1 (555) 123-4567", // Change this
  description: "Available Mon-Fri, 9AM-6PM EST" // Change this
}
```

### Adding New Contact Methods

You can add new contact methods by:
1. **Import a new icon** from lucide-react
2. **Add a new object** to the `contactItems` array
3. **Follow the same structure** as existing items

### Contact Form

The contact form automatically handles:
- Form validation
- Error messages
- Success notifications
- Responsive design

No additional configuration needed for basic contact functionality.

## Content Writing Tips

### Writing Effective Descriptions

- **Be specific** about your skills and experience
- **Use action words** to describe your work
- **Include metrics** when possible (years of experience, project counts)
- **Keep it concise** but informative

### Professional Tone

- **Write in first person** for personal sections
- **Use professional language** while staying approachable
- **Show personality** while maintaining professionalism
- **Update regularly** to keep content current
