import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  type Selection,
  type ChipProps,
  type SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
  type DateValue,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { stat } from "fs";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";
import Image from "next/image";
import { type Pet } from "@prisma/client";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "GENDER", uid: "gender", sortable: true },
  { name: "SPECIES", uid: "specie", sortable: true },
  { name: "BIRTHDATE", uid: "birthdate", sortable: true },
  { name: "BREED", uid: "breed", sortable: true },
  { name: "DESCRIPTION", uid: "description" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Available", uid: "available", label: "Available", key: "available" },
  {
    name: "Not Available",
    uid: "notavailable",
    label: "Not Available",
    key: "notavailable",
  },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  available: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "specie", "status", "actions"];

export default function App() {
  const [editingPet, setEditingPet] = React.useState<Pet | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = React.useState("");
  const pets = api.pet.get.useQuery().data ?? [];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPets = [...pets];

    if (hasSearchFilter) {
      filteredPets = filteredPets.filter((pet) =>
        pet.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPets = filteredPets.filter((pet) =>
        Array.from(statusFilter).includes(pet.status),
      );
    }

    return filteredPets;
  }, [pets, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Pet];
      const second = b[sortDescriptor.column as keyof Pet];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((pet: Pet, columnKey: React.Key) => {
    const cellValue = pet[columnKey as keyof Pet];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: pet.image }}
            description={pet.breed}
            name={pet.name}
          ></User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[pet.status]}
            size="sm"
            variant="flat"
          >
            {pet.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon
                    icon="tabler:dots-vertical"
                    className="text-default-300"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setEditingPet(pet);
                    onOpen();
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this pet?")) {
                      deletePet.mutate({ id: pet.id });
                    }
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return (cellValue ?? "").toString();
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 p-10">
        <div className="text-2xl">Pet Management</div>
        <div className="mt-6 flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Icon icon="line-md:search-twotone" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <Icon icon="mingcute:down-line" className="text-small" />
                  }
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <Icon icon="mingcute:down-line" className="text-small" />
                  }
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onPress={onOpen}
              color="primary"
              endContent={<Icon icon="line-md:plus" />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {pets.length} pets
          </span>
          <label className="flex items-center gap-4 text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    pets.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="mx-10 flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const router = useRouter();
  const utils = api.useUtils();

  const deletePet = api.pet.delete.useMutation({
    async onSuccess() {
      await utils.pet.get.refetch();
      alert("Pet deleted successfully");
    },
    async onError(error) {
      alert("Error deleting pet: " + error.message);
    },
  });

  const addPet = api.pet.create.useMutation({
    async onSuccess() {
      await utils.pet.get.refetch();
      alert("Pet added successfully");
    },
    async onError(error) {
      alert("Error adding pet: " + error.message);
    },
  });

  const handleAddPet = (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      specie: formData.get("specie") as string,
      breed: formData.get("breed") as string,
      description: formData.get("description") as string,
      birthdate: formData.get("birthdate") as string,
      image: image,
    };
    console.log(data);
    addPet.mutate(data);
  };

  const updatePet = api.pet.update.useMutation({
    async onSuccess() {
      await utils.pet.get.refetch();
      alert("Pet updated successfully");
    },
    async onError(error) {
      alert("Error updating pet: " + error.message);
    },
  });

  const handleUpdate = (formData: FormData) => {
    const data = {
      id: editingPet?.id,
      name: formData.get("name") as string,
      specie: formData.get("specie") as string,
      breed: formData.get("breed") as string,
      description: formData.get("description") as string,
      birthdate: formData.get("birthdate") as string,
      image: image === "" ? editingPet?.image : image,
    };
    console.log(data);
    updatePet.mutate(data);
  };

  return (
    <div>
      <Table
        aria-label="Pets Table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] w-[1200px] mx-9",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form action={editingPet ? handleUpdate : handleAddPet}>
              <ModalHeader className="flex flex-col gap-1">
                Add New Pet
              </ModalHeader>
              <ModalBody>
                {image ? (
                  <Image src={image} height={200} width={200} alt="pet" />
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    className="border-dashed border-white"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setImage(res[0]?.url ?? "");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
                <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    type="name"
                    variant="bordered"
                    label="Name"
                    name="name"
                    defaultValue={editingPet?.name}
                  />
                  <Input
                    type="species"
                    variant="bordered"
                    label="Species"
                    name="specie"
                    defaultValue={editingPet?.specie}
                  />
                </div>
                <Input
                  variant="bordered"
                  label="Breed"
                  name="breed"
                  defaultValue={editingPet?.breed}
                />

                <Textarea
                  type="description"
                  variant="bordered"
                  label="Description"
                  name="description"
                  defaultValue={editingPet?.description}
                />
                <DatePicker
                  label="Birth date"
                  className="w-full"
                  name="birthdate"
                  defaultValue={
                    editingPet?.birthdate
                      ? parseDate(editingPet?.birthdate)
                      : undefined
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  className="text-[#6f4ef2]"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  {editingPet ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
