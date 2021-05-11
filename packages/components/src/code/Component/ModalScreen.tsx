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
// import { Multiselect } from 'multiselect-react-dropdown';
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
  } = props

  // const selsStatus: any = statusDropdownList.find((item: any) => {
  //   return item.status_id === selectedTickit.status_id
  // })

  // const selpriority = priorityDropdownList.find((item: any) => {
  //   return item.value === selectedTickit.priority_id
  // })

  const [PendingWith, setPendingWithDropdown] = useState([] as any)
  const [Department, setDepartment] = useState([] as any)
  const [PolicyNo, setPolicyNo] = useState([] as any)
  const [AssignTo, setAssignTo] = useState([] as any)
  const [Priority, setPriority] = useState([] as any)
  const [DueDate, setDueDate] = useState(new Date())
  const [Status, setStatus] = useState([] as any)
  const [FakeNewsType, setFakeNewsType] = useState([] as any)
  const [FakeFactor, setFakeFactor] = useState([] as any)
  const [isConversation, setIsConversation] = useState(true)
  const [isCRM, setIsCRM] = useState(false)
  const [assignToData, setAssignToData] = useState([] as any)
  // const [userDetailss, setUserDetails] = useState(false)
  const [CalenderVisible, setCalenderVisible] = useState(false)
  const [OMC, setOMC] = useState([] as any)
  const [SBU, setSBU] = useState([] as any)
  const [TypeOfQuery, setTypeOfQuery] = useState([] as any)
  const [filterData, setFilterData] = useState({
    // PendingWith: "",
    // Department: "",
    // OMC: "",
    // PolicyNo: "",
    // Priority: "",
    // SBU: "",
    // Status: "",
    // TypeOfQuery: "",
    // FakeFactor: "",
    // FakeNewsType: ""
  } as any)

  // useEffect(() => {
  // const data: any = { ...filterData }
  // data.Priority = selpriority && selpriority
  // data.Status = selsStatus && selsStatus
  // setFilterData(data)
  // props.setChatFilterData(data)

  // }, [])

  useEffect(() => {
    const dynamicControls = async () => {
      try {
        const params = {
          client_id: clientDetails && clientDetails.client_id,
          group_id: CXP_CHAT_SCREEN_CONTROLS,
        }
        const res: any = await Api.get(
          `${configs.dynamic_get_controls}`,
          token,
          params,
        )
        console.log('dynamic control res', res)
        if (
          res.status === 200 &&
          res.data.controls !== null &&
          res.data.controls.length > 0
        ) {
          setPendingWithDropdown(res.data.controls[0])
          setDepartment(res.data.controls[1])
          setOMC(res.data.controls[2])
          setPolicyNo(res.data.controls[3])
          setAssignTo(res.data.controls[4])
          setPriority(res.data.controls[5])
          setSBU(res.data.controls[6])
          setStatus(res.data.controls[7])
          setDueDate(res.data.controls[8])
          setTypeOfQuery(res.data.controls[9])
          setFakeFactor(res.data.controls[10])
          setFakeNewsType(res.data.controls[11])
          props.clrChatOMCFilter()
          props.clrChatSBUFilter()
          props.clrChatPriorityFilter()
        }
      } catch (error) {
        console.log('dynamic Control error', error)
      }
    }

    dynamicControls()

    // const param = {
    //   address_book: {}, email_template: {}, canned_response: {
    //     status_id: ""
    //     // status_id: selsStatus && selsStatus.status_id
    //   }
    // }
    // channedResponse(param)
  }, [token])

  const channedResponse = async (param: any) => {
    console.log('dynamic Canned Error')

    // try {
    //   const body = {
    //     client_id: selectedTickit.client_id,
    //     params: param
    //     // params: {
    //     //   address_book: {}, email_template: {}, canned_response: {
    //     //     status_id: selsStatus && selsStatus.status_id
    //     //   }
    //     // },
    //   }
    //   const res: any = await Api.post(
    //     `${configs.dynamic_canned_response}`,
    //     body,
    //     token,
    //   )
    //   console.log('dynamic canned Res', res)
    //   if (res.status === 200) {
    //     // setDynamicCannedRes(res.data.data[0].val)
    //     // setEmailTemplate(res.data.data[1].val)
    //     // setAddressBook(res.data.data[2].val)
    //   }
    // } catch (error) {
    //   console.log('dynamic Canned Error', error)
    // }
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
    let blockedBy = ''
    let priorityId = ''
    let dprtId = ''
    let omcId = ''
    let policyNo = ''
    let sbuId = ''
    let statusId = ''
    let categoryId = ''
    let fakeNewsType = ''
    let fakeFactor = ''

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
      custom_column: fields.custom_column,
      updated_field: fields.updated_field,
      blocked_by: blockedBy,
      priority_id: priorityId,
      department_id: dprtId,
      omc_id: omcId,
      policy_number: policyNo,
      sbu: sbuId,
      status_id: statusId,
      category_id: categoryId,
      fake_news_type: fakeNewsType,
      fake_factor: fakeFactor,
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
    // channedResponse(param)

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
    // channedResponse(param)

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
    // channedResponse(param)
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
    // channedResponse(param)
    try {
      const data: any = { ...filterData }
      data.Status = item
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
                  list={PendingWith.lookup_data}
                  onSelectValue={selectedPendingItem}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Department
                </Text>
                <DropdownList
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
                    style={{}}
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
                {/* <Multiselect
                  style={{ position: "static" }}
                  options={AssignTo.lookup_data}
                  displayValue="text"
                  showCheckbox={true}
                /> */}
                <DropdownList
                  list={AssignTo.lookup_data}
                  onSelectValue={selectedPendingItem}
                />

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
                    // defaultValue={{
                    //   // value: filterData.Priority && filterData.Priority.value,
                    //   // label: filterData.Priority && filterData.Priority.text
                    //   value: selpriority && selpriority.value,
                    //   label: selpriority && selpriority.text,
                    // }}
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
                      value: null,
                      // label: statusSelect
                      // label: filterData && filterData.Status && filterData.Status.status_name,
                      // label: <img src='https://unoboat.s3.ap-south-1.amazonaws.com/redflag.svg' alt="" />
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
                  // defaultValue={{
                  //   value: selsStatus && selsStatus.selpriority,
                  //   label: selsStatus && selsStatus.status_name,
                  // }}
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
                    list={TypeOfQuery.lookup_data}
                    onSelectValue={selectedTypeOfQuery}
                  />
                </View>
                <View style={styles.dropdownViewStyle}>
                  <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                    Fake Factor
                  </Text>
                  <DropdownList
                    list={FakeFactor.lookup_data}
                    onSelectValue={selectedFakeFactor}
                  />
                </View>
                <View style={styles.dropdownViewStyle}>
                  <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                    Fake News Type
                  </Text>
                  <DropdownList
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
