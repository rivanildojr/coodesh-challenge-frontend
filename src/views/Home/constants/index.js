export const TABLE_HEAD = [
  {
    name: 'Name',
    field: 'name',
    filter: false
  },
  {
    name: 'Gender',
    field: 'gender',
    filter: true
  },
  {
    name: 'Birth',
    field: 'dob',
    filter: false
  },
  {
    name: 'Actions',
    filter: false
  }
]

export const FIELD_NAME = 'Name'
export const FIELD_NATIONALITY = 'Nationality'

export const FILTER_NAME = [FIELD_NAME, FIELD_NATIONALITY]

export const FILTER_NAME_FIELD = [
  {
    name: FIELD_NAME,
    field: 'name'
  },
  {
    name: FIELD_NATIONALITY,
    field: 'nat'
  }
]
