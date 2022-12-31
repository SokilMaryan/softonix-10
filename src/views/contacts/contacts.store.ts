export const useContactsStore = defineStore('contactsStore', () => {
  //to check how lazy works
  const contacts = ref<IContact[]>([
    {
      id: 0,
      name: 'Maria',
      description: 'Winter',
      image: 'https://picsum.photos/200'
    }, {
      id: 1,
      name: 'Max',
      description: 'Power',
      image: 'https://picsum.photos/200'
    }, {
      id: 3,
      name: 'Sem',
      description: 'Smit',
      image: 'https://picsum.photos/80'
    }, {
      id: 4,
      name: 'Oleh',
      description: 'Oleh',
      image: 'https://picsum.photos/100'
    }, {
      id: 5,
      name: 'Vlad',
      description: 'Pers',
      image: 'https://picsum.photos/150'
    }, {
      id: 6,
      name: 'David',
      description: 'Loren',
      image: 'https://picsum.photos/200'
    }, {
      id: 7,
      name: 'Sam',
      description: 'Sam',
      image: 'https://picsum.photos/250'
    },
    {
      id: 8,
      name: 'Homer',
      description: 'Simpsons',
      image: 'https://picsum.photos/300'
    }, {
      id: 9,
      name: 'Margh',
      description: 'Simpsons',
      image: 'https://picsum.photos/350'
    }, {
      id: 10,
      name: 'Lisa',
      description: 'Simpsons',
      image: 'https://picsum.photos/400'
    }, {
      id: 11,
      name: 'Bart',
      description: 'Simpsons',
      image: 'https://picsum.photos/450'
    }, {
      id: 12,
      name: 'Leny',
      description: 'Leny',
      image: 'https://this-person-does-not-exist.com/img/avatar-147d7edeaab74ee33edcd2592eef7467.jpg'
    }, {
      id: 13,
      name: 'Moo',
      description: 'Moo',
      image: 'https://this-person-does-not-exist.com/img/avatar-147d7edeaab74ee33edcd2592eef7467.jpg'
    }, {
      id: 14,
      name: 'Bob',
      description: 'Sammso',
      image: 'https://thispersondoesnotexist.com/image'
    }, {
      id: 15,
      name: 'Duster',
      description: 'Rob',
      image: 'https://thispersondoesnotexist.com/image'
    }
  ])

  const getContacts = () => {
    if (contacts.value.length) return Promise.resolve()

    return contactsService.getContacts()
      .then(res => {
        contacts.value = res
      })
  }

  function addContact (contact: IContact) {
    contacts.value.push(contact)
  }

  function updateContact (contact: IContact) {
    const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
    contacts.value[currentIndex] = { ...contact }
  }

  function deleteContact (contact: IContact) {
    const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
    contacts.value.splice(currentIndex, 1)
  }

  return {
    contacts,
    getContacts,
    addContact,
    deleteContact,
    updateContact
  }
})
