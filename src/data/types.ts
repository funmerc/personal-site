export interface AboutData {
  interests: string[]
  goals: string[]
  why: string
}

export interface EducationItem {
  name: string
  graduation_date: string
  degree_title: string
  relevant_coursework: string[]
}

export interface EducationData {
  items: EducationItem[]
}

export interface WorkSection {
  label: string
  values: string[]
}

export interface WorkRole {
  companyTitle: string
  workDateRange: string
  jobTitle: string
  jobLocation: string
  sections: WorkSection[]
}

export interface UsesSection {
  label: string
  items: string[]
}

export interface UsesData {
  sections: UsesSection[]
}

export interface StatusData {
  currently: string
  next: string
  future: string
}
