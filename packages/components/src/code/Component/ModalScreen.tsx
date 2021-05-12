import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
// @ts-ignore
import { Calendar } from 'react-date-range'
import moment from 'moment'
// @ts-ignore
import { Multiselect } from 'multiselect-react-dropdown'
import Chat from './Chat'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import UserHistory from './UserHistory'
import UserData from './UserDetails_New'
import { CXP_CHAT_SCREEN_CONTROLS } from '../provider/Const'
import { DropdownList } from './ReactSelect'
import { logActivityApi } from '../CommnFncn/IntegrationAPI'

const ModalScreen = (props: any) => {
  const {
    complaintId,
    clientId,
    token,
    userId,
    selectedTickit,
    clientDetails,
    isChatSBU,
    isChatPriority,
    isChatOMC,
    statusDropdownList,
    priorityDropdownList,
    userDetails,
    dynamicControl,
  } = props

  const PendingWith =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[0]
  const Department =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[1]
  const OMC =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[2]
  const PolicyNo =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[3]
  const AssignTo =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[4]
  const Priority =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[5]
  const SBU =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[6]
  const Status =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[7]
  // const dueDate = dynamicControl[8]
  const TypeOfQuery =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[9]
  const FakeFactor =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[10]
  const FakeNewsType =
    dynamicControl !== undefined &&
    dynamicControl.length > 0 &&
    dynamicControl[11]

  const selsPendingWith: any =
    PendingWith.lookup_data !== undefined &&
    PendingWith.lookup_data.length > 0 &&
    PendingWith.lookup_data.find((item: any) => {
      return item.value === selectedTickit.blocked_by
    })

  const selsDepartment: any =
    Department.lookup_data !== undefined &&
    Department.lookup_data.length > 0 &&
    Department.lookup_data.find((item: any) => {
      return item.value === selectedTickit.department_id
    })

  let selsOMC: any
  if (selectedTickit.custom_column && selectedTickit.custom_column.omc_id) {
    selsOMC =
      OMC.lookup_data !== undefined &&
      OMC.lookup_data.length > 0 &&
      OMC.lookup_data.find((item: any) => {
        return item.value === selectedTickit.custom_column.omc_id
      })
  }

  const selsStatus: any =
    Status.lookup_data !== undefined &&
    Status.lookup_data.length > 0 &&
    Status.lookup_data.find((item: any) => {
      return item.value === selectedTickit.status_id
    })

  const selPriority =
    Priority.lookup_data !== undefined &&
    Priority.lookup_data.length > 0 &&
    Priority.lookup_data.find((item: any) => {
      return item.value === selectedTickit.priority_id
    })

  let selTypeOfQuery: any
  if (
    selectedTickit.custom_column &&
    selectedTickit.custom_column.category_id
  ) {
    selTypeOfQuery =
      TypeOfQuery.lookup_data !== undefined &&
      TypeOfQuery.lookup_data.length > 0 &&
      TypeOfQuery.lookup_data.find((item: any) => {
        return item.value === selectedTickit.custom_column.category_id
      })
  }

  let selSBU: any
  if (selectedTickit.custom_column && selectedTickit.custom_column.omc_id) {
    selSBU =
      SBU.lookup_data !== undefined &&
      SBU.lookup_data.length > 0 &&
      SBU.lookup_data.find((item: any) => {
        return item.value === selectedTickit.custom_column.omc_id
      })
  }

  const selsFakeFactor: any =
    FakeFactor.lookup_data !== undefined &&
    FakeFactor.lookup_data.length > 0 &&
    FakeFactor.lookup_data.find((item: any) => {
      return item.value === selectedTickit.fake_factor
    })

  const selsFakeNewsType: any =
    FakeNewsType.lookup_data !== undefined &&
    FakeNewsType.lookup_data.length > 0 &&
    FakeNewsType.lookup_data.find((item: any) => {
      return item.value === selectedTickit.fake_news_type
    })

  const [DueDate, setDueDate] = useState(new Date())
  const [isConversation, setIsConversation] = useState(true)
  const [isCRM, setIsCRM] = useState(false)
  const [assignToData, setAssignToData] = useState([] as any)
  // const [userDetailss, setUserDetails] = useState(false)
  const [CalenderVisible, setCalenderVisible] = useState(false)
  const [filterData, setFilterData] = useState({} as any)
  const [assignTo, setAssignTo] = useState([] as any)

  useEffect(() => {
    try {
      const data: any = { ...filterData }
      data.PendingWith = selsPendingWith && selsPendingWith
      data.Department = selsDepartment && selsDepartment
      data.OMC = selsOMC && selsOMC
      data.Priority = selPriority && selPriority
      data.SBU = selSBU && selSBU
      data.Status = selsStatus && selsStatus
      data.TypeOfQuery = selTypeOfQuery && selTypeOfQuery
      data.FakeFactor = selsFakeFactor && selsFakeFactor
      data.FakeNewsType = selsFakeNewsType && selsFakeNewsType
      setFilterData(data)
      props.setChatFilterData(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    const params: any = {
      status_id: (selsStatus && selsStatus.value) || '',
      department_id: (selsDepartment && selsDepartment.value) || '',
      category_id: (selTypeOfQuery && selTypeOfQuery.value) || '',
      // department_id: "63",
      omc_id: (selsOMC && selsOMC.value) || '',
      sbu: (selSBU && selSBU.value) || '',
    }
    channedResponse(params)
  })

  const onSelect = (item: any) => {
    console.log('multi', item)
    setAssignTo(item)
  }

  // const onRemove = (item: any) => {
  //   console.log("multiDD", item);
  // }

  const channedResponse = async (param: any) => {
    try {
      const body = {
        client_id: selectedTickit.client_id,
        params: {
          address_book: { department_id: param.department_id },
          email_template: { department_id: param.department_id },
          canned_response: {
            status_id: param.status_id,
            department_id: param.department_id,
            category_id: param.category_id,
            omc_id: param.omc_id,
            sbu: param.sbu,
          },
          // address_book: {}, email_template: {},
          // canned_response: {}
        },
      }
      const res: any = await Api.post(
        `${configs.dynamic_canned_response}`,
        body,
        token,
      )
      console.log('dynamic canned Res', res)
      if (res.status === 200) {
        // setDynamicCannedRes(res.data.data[0].val)
        // setEmailTemplate(res.data.data[1].val)
        // setAddressBook(res.data.data[2].val)
      }
    } catch (error) {
      console.log('dynamic Canned Error', error)
    }
  }

  const logActivity = (data: any) => {
    const body = {
      activity_id: null,
      assigned_to: null,
      blocked_by: data.blocked_by,
      client_id: clientDetails && clientDetails.client_id,
      complaint_id: selectedTickit && selectedTickit.complaint_id,
      conversation_text: 'Field updated successfully !!',
      created_by: clientDetails && clientDetails.client_name,
      custom_column: data.custom_column,
      category_id: data.category_id,
      due_date: data.due_date,
      omc_id: data.omc_id,
      policy_number: data.policy_number,
      sbu: data.sbu,
      department_id: data.department_id,
      fake_factor: data.fake_factor,
      fake_news_type: data.fake_news_type,
      is_dm: selectedTickit && selectedTickit.is_dm,
      is_internal: true,
      is_internal_user: true,
      is_system_generated: true,
      is_user_reply: false,
      medium_id: selectedTickit && selectedTickit.medium_id,
      medium_name: 'Youtube',
      priority_id: data.priority_id,
      resolution_text: null,
      status_id: data.status_id,
      updated_field: data.updated_field,
      user_id: userDetails && userDetails.user_id,
    }
    const res: any = logActivityApi(body, token)
    console.log(res, 'res')
  }

  const handleSelect = (date: any) => {
    setDueDate(date)
    setCalenderVisible(false)
    console.log('date', date) // native Date object
  }

  const pressConversation = () => {
    setIsCRM(false)
    setIsConversation(true)
  }
  const pressCRM = () => {
    setIsCRM(true)
    setIsConversation(false)
  }

  // const fetchActivity = async () => {
  //   try {
  //     const res: any = await Api.get(
  //       `${configs.get_activity}${complaintId}/2`,
  //       token,
  //     )
  //     console.log('fetch activity', res)
  //     if (res.status === 200) {
  //       // setChatData(res.data.data)
  //       console.log('fetch activity api success')
  //     }
  //   } catch (error) {
  //     console.log('fetch activityError', error)
  //   }
  // }

  // const onMarkSpam = async () => {
  //   try {
  //     const body = {
  //       activity_id: null,
  //       conversation_text: 'Marked as Spam !',
  //       created_by: 'system',
  //       is_internal_user: true,
  //       is_internal: true,
  //       is_system_generated: true,
  //       user_id: 5889,
  //       is_user_reply: false,
  //       department_id: 59,
  //       complaint_id: complaintId,
  //       medium_id: 2,
  //       status_id: 1,
  //       is_spam: true,
  //     }
  //     const res: any = await Api.post(`${configs.log_activity}`, body, token)
  //     console.log('spam res', res)
  //     if (res.status === 200) {
  //       console.log('spam api success')
  //     }
  //   } catch (error) {
  //     console.error('spam api error', error)
  //   }
  // }

  // const onRatingLink = async () => {
  //   try {
  //     const param: any = {
  //       complaint_id: complaintId,
  //     }
  //     const res: any = await Api.get(`${configs.ratingLink}`, token, param)
  //     console.log('rating link api res', res)
  //     if (res.status === 200) {
  //       console.log('rating link api success')
  //     }
  //   } catch (error) {
  //     console.error('rating api error', error)
  //   }
  // }

  // const showUserDetails = async () => {
  //   setUserDetails(!userDetails)
  // }

  const logActivtCommonFunction = (fields: any) => {
    let blockedBy: any = null
    let priorityId: any = null
    let dprtId: any = null
    let omcId: any = null
    let policyNo: any = null
    let sbuId: any = null
    let statusId: any = null
    let categoryId: any = null
    let fakeNewsType: any = null
    let fakeFactor: any = null

    if (fields && fields.blocked_by) {
      blockedBy = fields.blocked_by
    } else if (filterData.PendingWith) {
      blockedBy = filterData.PendingWith.value
    }

    if (fields.priority_id) {
      priorityId = fields.priority_id
    } else if (filterData.Priority) {
      priorityId = filterData.Priority.value
    }

    if (fields.department_id) {
      dprtId = fields.department_id
    } else if (filterData.Department) {
      dprtId = filterData.Department.value
    }

    if (fields.omc_id) {
      omcId = fields.omc_id
    } else if (filterData.OMC) {
      omcId = filterData.OMC.value
    }

    if (fields.policy_number) {
      policyNo = fields.policy_number
    } else if (filterData.PolicyNo) {
      policyNo = filterData.PolicyNo.value
    }

    if (fields.sbu) {
      sbuId = fields.sbu
    } else if (filterData.SBU) {
      sbuId = filterData.SBU.value
    }

    if (fields.status_id) {
      statusId = fields.status_id
    } else if (filterData.Status) {
      statusId = filterData.Status.value
    }

    if (fields.category_id) {
      categoryId = fields.category_id
    } else if (filterData.TypeOfQuery) {
      categoryId = filterData.TypeOfQuery.value
    }

    if (fields.fake_news_type) {
      fakeNewsType = fields.fake_news_type
    } else if (filterData.FakeNewsType) {
      fakeNewsType = filterData.FakeNewsType.value
    }

    if (fields.fake_factor) {
      fakeFactor = fields.fake_factor
    } else if (filterData.FakeFactor) {
      fakeFactor = filterData.FakeFactor.value
    }

    const data: any = {
      // category_id: "21471",
      due_date: null,
      // omc_id: "21490",
      // policy_number: "",
      // sbu: null,
      // department_id: null,
      // fake_factor: "21571",
      // fake_news_type: "21562",
      // priority_id: "2",
      // status_id: "9",

      custom_column: fields.custom_column,
      updated_field: fields.updated_field,
      blocked_by: blockedBy,
      category_id: categoryId,
      department_id: dprtId,
      omc_id: omcId,
      policy_number: policyNo,
      sbu: sbuId,
      // status_id: "1",
      fake_factor: fakeFactor,
      fake_news_type: fakeNewsType,
      priority_id: priorityId,
      status_id: statusId,

      // blocked_by: null,
    }
    logActivity(data)
  }

  const selectedPendingItem = (item: any) => {
    const body: any = {
      custom_column: {
        omc_id: (filterData.OMC && filterData.OMC.value) || '',
        policy_number: (filterData.PolicyNo && filterData.PolicyNo.value) || '',
        sbu: (filterData.SBU && filterData.SBU.value) || '',
        due_date: null,
        category_id:
          (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
      },
      blocked_by: item.value,
      updated_field: { blocked_by: item.value },
    }
    logActivtCommonFunction(body)
    const data: any = { ...filterData }
    data.PendingWith = item
    setFilterData(data)
    props.setChatFilterData(data)
  }

  const selectedDepartment = (item: any) => {
    // const param = {
    //   address_book: {
    //     department_id: item.value || ""
    //   },
    //   email_template: {
    //     department_id: item.value || ""
    //   },
    //   canned_response: {
    //     status_id: filterData.Status.status_id || "",
    //     category_id: filterData.TypeOfQuery.value || "",
    //     department_id: item.value || "",
    //     omc_id: filterData.OMC.value || "",
    //     sbu: filterData.SBU.value || "",
    //   }
    // }
    const params: any = {
      status_id: (selsStatus && selsStatus.value) || '',
      department_id: (item && item.value) || '',
      category_id: (selTypeOfQuery && selTypeOfQuery.value) || '',
      // department_id: "63",
      omc_id: (selsOMC && selsOMC.value) || '',
      sbu: (selSBU && selSBU.value) || '',
    }
    channedResponse(params)

    const body: any = {
      custom_column: {
        omc_id: (filterData.OMC && filterData.OMC.value) || '',
        policy_number: (filterData.PolicyNo && filterData.PolicyNo.value) || '',
        sbu: (filterData.SBU && filterData.SBU.value) || '',
        due_date: null,
        category_id:
          (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
      },
      department_id: item.value,
      updated_field: { department_id: item.value },
    }
    logActivtCommonFunction(body)

    // console.log('selectedPendingItem', item)
    const data: any = { ...filterData }
    data.Department = item
    setFilterData(data)
    props.setChatFilterData(data)
  }

  const selectedOMC = (item: any) => {
    // console.log('selectedPendingItem', item)
    // const param = {
    //   address_book: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   email_template: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   canned_response: {
    //     status_id: filterData.Status.status_id || "",
    //     category_id: filterData.TypeOfQuery.value || "",
    //     department_id: filterData.Department.value || "",
    //     omc_id: item.value || "",
    //     sbu: filterData.SBU.value || "",
    //   }
    // }

    const params: any = {
      status_id: (selsStatus && selsStatus.value) || '',
      department_id: (selsDepartment && selsDepartment.value) || '',
      category_id: (selTypeOfQuery && selTypeOfQuery.value) || '',
      // department_id: "63",
      omc_id: (item && item.value) || '',
      sbu: (selSBU && selSBU.value) || '',
    }
    channedResponse(params)

    const body: any = {
      custom_column: {
        omc_id: item.value || '',
        policy_number: (filterData.PolicyNo && filterData.PolicyNo.value) || '',
        sbu: (filterData.SBU && filterData.SBU.value) || '',
        due_date: null,
        category_id:
          (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
      },
      omc_id: item.value,
      updated_field: { omc_id: item.value },
    }
    logActivtCommonFunction(body)

    const data: any = { ...filterData }
    data.OMC = item
    setFilterData(data)
    props.clrChatOMCFilter()
    props.setChatFilterData(data)
  }

  const selectedPolicyNo = (item: any) => {
    console.log('selectedPendingItem', item)
    try {
      if (item) {
        const body: any = {
          custom_column: {
            omc_id: (filterData.OMC && filterData.OMC.value) || '',
            policy_number: item.value || '',
            sbu: (filterData.SBU && filterData.SBU.value) || '',
            due_date: null,
            category_id:
              (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
          },
          policy_number: item.value,
          updated_field: { policy_number: item.value },
        }
        logActivtCommonFunction(body)

        const data: any = { ...filterData }
        data.PolicyNo = item
        setFilterData(data)
        props.setChatFilterData(data)
      }
    } catch (error) {
      console.error('error', error)
    }
  }

  const selectedPriority = (item: any) => {
    // console.log('selectedPendingItem', item)
    try {
      const body: any = {
        custom_column: {
          omc_id: (filterData.OMC && filterData.OMC.value) || '',
          priority_id: item.value || '',
          sbu: (filterData.SBU && filterData.SBU.value) || '',
          due_date: null,
          category_id:
            (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
        },
        priority_id: item.value,
        updated_field: { priority_id: item.value },
      }
      logActivtCommonFunction(body)

      const data: any = { ...filterData }
      data.Priority = item
      setFilterData(data)
      props.clrChatPriorityFilter()
      props.setChatFilterData(data)
    } catch (error) {
      console.error()
    }
  }

  const selectedSBU = (item: any) => {
    // console.log('selectedPendingItem', item)
    // const param = {
    //   address_book: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   email_template: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   canned_response: {
    //     status_id: filterData.Status.status_id || "",
    //     category_id: filterData.TypeOfQuery.value || "",
    //     department_id: filterData.Department.value || "",
    //     omc_id: filterData.OMC.value || "",
    //     sbu: item.value || "",
    //   }
    // }

    const params: any = {
      status_id: (selsStatus && selsStatus.value) || '',
      department_id: (selsDepartment && selsDepartment.value) || '',
      category_id: (selTypeOfQuery && selTypeOfQuery.value) || '',
      // department_id: "63",
      omc_id: (selsOMC && selsOMC.value) || '',
      sbu: (item && item.value) || '',
    }
    channedResponse(params)
    try {
      const body: any = {
        custom_column: {
          omc_id: (filterData.OMC && filterData.OMC.value) || '',
          policy_number:
            (filterData.PolicyNo && filterData.PolicyNo.value) || '',
          sbu: item.value,
          due_date: null,
          category_id:
            (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
        },
        sbu: item.value,
        updated_field: { sbu: item.value },
      }
      logActivtCommonFunction(body)

      const data: any = { ...filterData }
      data.SBU = item
      setFilterData(data)
      props.clrChatSBUFilter()
      props.setChatFilterData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const selectedStatus = (item: any) => {
    // console.log('selectedPendingItem', item)
    // const param = {
    //   address_book: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   email_template: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   canned_response: {
    //     status_id: item.status_id || "",
    //     category_id: filterData.TypeOfQuery.value || "",
    //     department_id: filterData.Department.value || "",
    //     omc_id: filterData.OMC.value || "",
    //     sbu: filterData.SBU.value || "",
    //   }
    // }

    try {
      const data: any = { ...filterData }
      data.Status = item
      setFilterData(data)
      props.setChatFilterData(data)

      const params: any = {
        status_id: (item && item.value) || '',
        department_id: (selsDepartment && selsDepartment.value) || '',
        category_id: (selTypeOfQuery && selTypeOfQuery.value) || '',
        // department_id: "63",
        omc_id: (selsOMC && selsOMC.value) || '',
        sbu: (selSBU && selSBU.value) || '',
      }
      channedResponse(params)

      const body: any = {
        custom_column: {
          omc_id: (filterData.OMC && filterData.OMC.value) || '',
          policy_number:
            (filterData.PolicyNo && filterData.PolicyNo.value) || '',
          sbu: (filterData.SBU && filterData.SBU.value) || '',
          due_date: null,
          category_id:
            (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
        },
        status_id: item.value,
        updated_field: { status_id: item.value },
      }
      logActivtCommonFunction(body)
    } catch (error) {
      console.error(error)
    }
  }

  const selectedTypeOfQuery = (item: any) => {
    // console.log('selectedPendingItem', item)
    // const param = {
    //   address_book: {
    //     department_id: (filterData.Department && filterData.Department.value) || ""
    //   },
    //   email_template: {
    //     department_id: filterData.Department.value || ""
    //   },
    //   canned_response: {
    //     status_id: item.status_id || "",
    //     category_id: item.value || "",
    //     department_id: filterData.Department.value || "",
    //     omc_id: filterData.OMC.value || "",
    //     sbu: filterData.SBU.value || "",
    //   }
    // }
    // channedResponse(param)

    try {
      const data: any = { ...filterData }
      data.TypeOfQuery = item
      setFilterData(data)
      props.setChatFilterData(data)

      const params: any = {
        status_id: (selsStatus && selsStatus.value) || '',
        department_id: (selsDepartment && selsDepartment.value) || '',
        category_id: (item && item.value) || '',
        // department_id: "63",
        omc_id: (selsOMC && selsOMC.value) || '',
        sbu: (selSBU && selSBU.value) || '',
      }
      channedResponse(params)

      const body: any = {
        custom_column: {
          omc_id: (filterData.OMC && filterData.OMC.value) || '',
          policy_number:
            (filterData.PolicyNo && filterData.PolicyNo.value) || '',
          sbu: (filterData.SBU && filterData.SBU.value) || '',
          due_date: null,
          category_id: item.value,
        },
        category_id: item.value,
        updated_field: { category_id: item.value },
      }
      logActivtCommonFunction(body)
    } catch (error) {
      console.error(error)
    }
  }

  const selectedFakeFactor = (item: any) => {
    // console.log('selectedPendingItem', item)
    const data: any = { ...filterData }
    data.FakeFactor = item
    setFilterData(data)
    props.setChatFilterData(data)
    const body: any = {
      custom_column: {
        omc_id: (filterData.OMC && filterData.OMC.value) || '',
        policy_number: (filterData.PolicyNo && filterData.PolicyNo.value) || '',
        sbu: (filterData.SBU && filterData.SBU.value) || '',
        due_date: null,
        category_id:
          (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
      },
      fake_factor: item.value,
      updated_field: { fake_factor: item.value },
    }
    logActivtCommonFunction(body)
  }

  const selectedFakeNewsType = (item: any) => {
    // console.log('selectedPendingItem', item)
    try {
      const data: any = { ...filterData }
      data.FakeNewsType = item
      setFilterData(data)
      props.setChatFilterData(data)

      const body: any = {
        custom_column: {
          omc_id: (filterData.OMC && filterData.OMC.value) || '',
          policy_number:
            (filterData.PolicyNo && filterData.PolicyNo.value) || '',
          sbu: (filterData.SBU && filterData.SBU.value) || '',
          due_date: null,
          category_id:
            (filterData.TypeOfQuery && filterData.TypeOfQuery.value) || '',
        },
        fake_news_type: item.value,
        updated_field: { fake_news_type: item.value },
      }
      logActivtCommonFunction(body)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 15 }}>
          <View style={{ flex: 5 }}>
            {/* {isCRM &&
              (userDetails ? (
                <UserData userId={userId} onClose={showUserDetails} />
              ) : (
                <UserHistory showUserDetails={showUserDetails} />
              ))} */}
            {/* {isCRM ? <UserData userId={userId} onClose={showUserDetails}/> : null} */}

            {/* {isConversation ? ( */}
            <Chat complaintId={complaintId} clientId={clientId} />
            {/* ) : null} */}
          </View>
          <View style={styles.verticleLine} />
          <View
            style={{
              flex: 1,
              paddingHorizontal: '1%',
              backgroundColor: '#FBFBFB',
              paddingBottom: '4%',
            }}
          >
            <View style={{ paddingVertical: '5%' }}>
              <Text style={[styles.textStyle, { fontWeight: '700' }]}>
                Edit
              </Text>
            </View>
            <ScrollView
              style={{ paddingHorizontal: '3%', paddingVertical: '2%' }}
            >
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Pending With
                </Text>
                <DropdownList
                  defaultValue={{
                    value: selsPendingWith && selsPendingWith.value,
                    label: selsPendingWith && selsPendingWith.text,
                  }}
                  list={PendingWith.lookup_data}
                  onSelectValue={selectedPendingItem}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Department
                </Text>
                <DropdownList
                  defaultValue={{
                    value: selsDepartment && selsDepartment.value,
                    label: selsDepartment && selsDepartment.text,
                  }}
                  list={Department.lookup_data}
                  onSelectValue={selectedDepartment}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  OMC
                </Text>
                <View
                  style={[
                    styles.filterValidation,
                    { borderWidth: isChatOMC ? 1 : 0, borderColor: 'red' },
                  ]}
                >
                  <DropdownList
                    defaultValue={{
                      value: selsOMC && selsOMC.value,
                      label: selsOMC && selsOMC.text,
                    }}
                    list={OMC.lookup_data}
                    onSelectValue={selectedOMC}
                  />
                </View>
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Policy Number
                </Text>
                <DropdownList
                  list={PolicyNo.lookup_data}
                  onSelectValue={selectedPolicyNo}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Assign To
                </Text>
                <Multiselect
                  // style={{ position: "static" }}
                  options={AssignTo.lookup_data}
                  displayValue="text"
                  // selectionLimit={2}
                  // defaultValue={[{ text: "merilent_int", value: 5896 }]}
                  // selectedValues={[{ text: "merilent_int", value: 5896 }]}
                  selectedValues={assignTo}
                  emptyRecordMsg="no data found"
                  showCheckbox
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onSelect} // Function will trigger on remove event
                />
                {/* <DropdownList
                  list={AssignTo.lookup_data}
                  onSelectValue={selectedPendingItem}
                /> */}

                {/* <MultipleDropdown
                  dropdownList={AssignTo.lookup_data}
                  selectedItem={selectedPendingItem}
                /> */}
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Priority
                </Text>
                <View
                  style={[
                    styles.filterValidation,
                    { borderWidth: isChatPriority ? 1 : 0, borderColor: 'red' },
                  ]}
                >
                  <DropdownList
                    defaultValue={{
                      value: selPriority && selPriority.value,
                      label: selPriority && selPriority.text,
                    }}
                    list={Priority.lookup_data}
                    onSelectValue={selectedPriority}
                  />
                </View>
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  SBU
                </Text>
                <View
                  style={[
                    styles.filterValidation,
                    {
                      borderWidth: isChatSBU ? 1 : 0,
                    },
                  ]}
                >
                  <DropdownList
                    defaultValue={{
                      value: selSBU && selSBU.value,
                      label: selSBU && selSBU.text,
                    }}
                    list={SBU.lookup_data}
                    onSelectValue={selectedSBU}
                  />
                </View>
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Status
                </Text>
                <DropdownList
                  defaultValue={{
                    value: selsStatus && selsStatus.value,
                    label: selsStatus && selsStatus.text,
                  }}
                  list={Status.lookup_data}
                  onSelectValue={selectedStatus}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Due Date
                </Text>

                <View>
                  {CalenderVisible ? (
                    <View>
                      <Calendar
                        style={{ width: '100%' }}
                        date={DueDate}
                        onChange={handleSelect}
                        showMonthAndYearPickers={false}
                        // maxDate={new Date()}
                        // minDate={new Date()}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: '4%',
                        borderRadius: 8,
                      }}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {
                          setCalenderVisible(!CalenderVisible)
                        }}
                      >
                        <Text>{moment(DueDate).format('DD-MM-YYYY')}</Text>
                        <Icon
                          style={styles.angleDown}
                          name="angle-down"
                          size={15}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.dropdownViewStyle}>
                  <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                    Type Of Query
                  </Text>
                  <DropdownList
                    defaultValue={{
                      value: selTypeOfQuery && selTypeOfQuery.value,
                      label: selTypeOfQuery && selTypeOfQuery.text,
                    }}
                    list={TypeOfQuery.lookup_data}
                    onSelectValue={selectedTypeOfQuery}
                  />
                </View>
                <View style={styles.dropdownViewStyle}>
                  <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                    Fake Factor
                  </Text>
                  <DropdownList
                    defaultValue={{
                      value: selsFakeFactor && selsFakeFactor.value,
                      label: selsFakeFactor && selsFakeFactor.text,
                    }}
                    list={FakeFactor.lookup_data}
                    onSelectValue={selectedFakeFactor}
                  />
                </View>
                <View style={styles.dropdownViewStyle}>
                  <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                    Fake News Type
                  </Text>
                  <DropdownList
                    defaultValue={{
                      value: selsFakeNewsType && selsFakeNewsType.value,
                      label: selsFakeNewsType && selsFakeNewsType.text,
                    }}
                    list={FakeNewsType.lookup_data}
                    onSelectValue={selectedFakeNewsType}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedTickit: state.tickitListData.selectedTickit
      ? state.tickitListData.selectedTickit
      : {},

    isChatOMC: state.Filter.isChatOMC,
    isChatPriority: state.Filter.isChatPriority,
    isChatSBU: state.Filter.isChatSBU,
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
    priorityDropdownList: state.dropdownListData.priorityDropdownList,
    statusDropdownList: state.dropdownListData.statusDropdownList,
    dynamicControl: state.Filter.dynamicControl,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setChatFilterData: (data: any) => {
      dispatch({ type: 'SET_CHAT_SCREEN_FILTER', payload: data })
    },
    clrChatPriorityFilter: () => {
      dispatch({ type: 'CLR_CHAT_PRIORITY_FILTER' })
    },
    clrChatSBUFilter: () => {
      dispatch({ type: 'CLR_CHAT_SBU_FILTER' })
    },
    clrChatOMCFilter: () => {
      dispatch({ type: 'CLR_CHAT_OMC_FILTER' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#EDEDED',
  },
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 28,
  },
  DropdownTextColor: {
    color: '#8A92BB',
  },
  dropdownViewStyle: {
    paddingVertical: '5%',
  },
  angleDown: {
    paddingTop: '1%',
    paddingLeft: '50%',
  },
  filterValidation: {
    borderColor: 'red',
    borderRadius: 5,
  },
})
